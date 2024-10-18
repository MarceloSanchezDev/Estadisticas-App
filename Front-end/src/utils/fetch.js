let token = ""

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export async function allStatistics(url) {
    if (!url) {
      return null;
    }
  
    try {
      const response = await fetch(url,{headers: {
        'Authorization' : token
    }});
      if (!response.ok) {
        return null;
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return null;
    }
  }
export async function newStatistics(url,{input}) {
  if (!url) {
    return null;
  }

  try {
    const response = await fetch(url,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : token
      },
      body: JSON.stringify({ input })})
    if (!response.ok) {
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function deleteStatistics(url,id){
    if (!url) {
      return null;
    }
  
    try {
      const response = await fetch(`${url}/${id}`,{method: 'DELETE',headers: {
        'Authorization' : token}
    })
      if (!response.ok) {
        return null;
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return null;
    }
  }

export async function loginUser(url,{username, password}){
  if (!url) {
    return null;
  }
   const user = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
  }).then(res => res.json()).catch (error=>{console.error("Error al iniciar sesion:", error)})
  return user
}

export async function registerUser(url, {username, password, nombre, apellido,email}) {
  if (!url) {
    return null;
  }
    const user = fetch(url,  {method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, nombre, apellido,email })
  }).then(res => res.json()).catch (error=>{console.error("Error al regristarse:", error)})
    return user;
  }
