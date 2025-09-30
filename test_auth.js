async function testAuth() {
    try {
        console.log('Testing JWT authentication...');
        
        // Test registration
        const response = await fetch('http://localhost:3002/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                role: 'buyer'
            })
        });
        
        console.log('Registration Response Status:', response.status);
        console.log('Registration Response Headers:', response.headers);
        
        const data = await response.text();
        console.log('Registration Response Data:', data);
        
        // Check if we got cookies
        const cookies = response.headers.get('set-cookie');
        console.log('Cookies received:', cookies);
        
    } catch (error) {
        console.error('Error testing auth:', error.message);
    }
}

testAuth();