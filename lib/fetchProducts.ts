export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  try {
    const res = await fetch('https://fakestoreapi.com/products', {
      signal,
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products (status ${res.status})`);
    }

    const data = (await res.json()) as unknown;

    if (!Array.isArray(data)) {
      throw new Error('Invalid products response');
    }

    return data as Product[];
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      return [];
    }

    throw err;
  }
}
