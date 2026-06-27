// api/login.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;
  
  // Check against stored users (in localStorage or database)
  // For now, check against environment variable
  const validPassword = process.env.ADMIN_PASSWORD;
  
  // Also check against user list
  // In production, this should query a database
  
  if (password === validPassword) {
    return res.status(200).json({ 
      success: true,
      user: {
        name: 'Admin',
        username: 'admin',
        role: 'admin'
      }
    });
  } else {
    return res.status(401).json({ 
      success: false, 
      error: 'Invalid password' 
    });
  }
}