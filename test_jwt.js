// Test JWT Authentication
console.log('Testing JWT Authentication System...');

// Test data
const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    role: 'buyer'
};

async function testRegistration() {
    try {
        console.log('🔄 Testing user registration...');
        
        const response = await fetch('http://localhost:3002/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Important for cookies
            body: JSON.stringify(testUser)
        });

        console.log('📊 Registration Response Status:', response.status);
        console.log('📋 Response Headers:', [...response.headers.entries()]);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Registration successful!');
            console.log('🎯 Response data:', data);
            
            // Check if we got cookies
            const cookies = response.headers.get('Set-Cookie');
            if (cookies) {
                console.log('🍪 Cookies set:', cookies);
            }
            return true;
        } else {
            const errorData = await response.json();
            console.log('❌ Registration failed!');
            console.log('🚨 Error:', errorData);
            return false;
        }
    } catch (error) {
        console.error('💥 Network error during registration:', error.message);
        return false;
    }
}

async function testLogin() {
    try {
        console.log('🔄 Testing user login...');
        
        const response = await fetch('http://localhost:3002/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: testUser.email,
                password: testUser.password
            })
        });

        console.log('📊 Login Response Status:', response.status);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Login successful!');
            console.log('🎯 Response data:', data);
            return true;
        } else {
            const errorData = await response.json();
            console.log('❌ Login failed!');
            console.log('🚨 Error:', errorData);
            return false;
        }
    } catch (error) {
        console.error('💥 Network error during login:', error.message);
        return false;
    }
}

// Run tests
async function runTests() {
    console.log('🚀 Starting JWT Authentication Tests...\n');
    
    // Test registration
    const registrationSuccess = await testRegistration();
    console.log('\n' + '='.repeat(50) + '\n');
    
    if (registrationSuccess) {
        // Test login
        const loginSuccess = await testLogin();
        console.log('\n' + '='.repeat(50) + '\n');
        
        if (loginSuccess) {
            console.log('🎉 All tests passed! JWT authentication is working correctly.');
            console.log('✅ The "Setting up profile and gets stuck" issue should be resolved.');
        } else {
            console.log('⚠️  Registration works but login has issues.');
        }
    } else {
        console.log('⚠️  Registration failed - need to investigate.');
    }
}

runTests();