import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ApiTest() {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3002');
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testRegister = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3002/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'testpass123',
          fullName: 'Test User',
          role: 'buyer'
        })
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      
      <div className="space-y-4">
        <Button onClick={testConnection} disabled={loading}>
          Test Basic Connection
        </Button>
        
        <Button onClick={testRegister} disabled={loading}>
          Test Registration
        </Button>
        
        <div className="mt-4">
          <h3 className="font-semibold">Response:</h3>
          <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto">
            {response || 'No response yet'}
          </pre>
        </div>
      </div>
    </div>
  );
}