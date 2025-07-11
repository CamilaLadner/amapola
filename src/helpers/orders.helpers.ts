const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export async function createOrder(products: number[], token: string) {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        products
      }),
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error: any) {
      throw new Error(error)
  }
}

export async function getOrders(token: string) {
  try {
    const response = await fetch(`${BASE_URL}/users/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
   
      return response.json();
    
  } catch (error: any) {
      throw new Error(error)
  }
}
