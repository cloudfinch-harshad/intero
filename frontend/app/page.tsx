"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

// API base URL from environment variables (defaults to localhost if not set)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Home() {
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const testApi = async () => {
    setIsLoading(true);
    setApiResponse(null);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/api/hello`);
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      const data = await response.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to API');
      console.error('API request error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center gap-8">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to Intero</h1>
        <p className="text-xl mb-8">A modern monorepo with Next.js frontend and FastAPI backend</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>Frontend</CardTitle>
            <CardDescription>Built with Next.js 15 and shadcn/ui components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-4">
              <Image
                src="/next.svg"
                alt="Next.js logo"
                width={120}
                height={120}
                priority
              />
            </div>
            <p className="text-sm mt-4">Modern, responsive UI with the latest React features</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Documentation</Button>
            <Button>Explore</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backend</CardTitle>
            <CardDescription>FastAPI with Python 3.13</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4">
              <p className="text-sm mb-4">Powerful and efficient API endpoints</p>
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md">
                <code className="text-xs">GET /api/hello</code>
              </div>
            </div>
            <div className="mt-4">
              <Input placeholder="Try API endpoint..." value="/api/hello" disabled />
            </div>
            {apiResponse && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-900">
                <p className="text-xs font-semibold mb-1 text-green-800 dark:text-green-400">API Response:</p>
                <pre className="text-xs overflow-x-auto p-2 bg-white/50 dark:bg-slate-800/50 rounded">
                  {apiResponse}
                </pre>
              </div>
            )}
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">API Docs</Button>
            <Button onClick={testApi} disabled={isLoading}>
              {isLoading ? "Loading..." : "Test API"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Intero. A Next.js + FastAPI Monorepo.</p>
      </footer>
    </div>
  );
}
