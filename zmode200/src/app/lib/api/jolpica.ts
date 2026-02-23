

const BASE_URL="https://api.jolpi.ca/ergast/f1/";


export async function fetchF1<T>(
    endpoint: string, 
    params?:Record<string,string>,
    revalidate: number = 3600 ): Promise<T>{
    
    const url = new URL(`${BASE_URL}${endpoint}.json`)
    url.searchParams.set("limit","100"); 

    if (params) {
        Object.entries(params).forEach(([key,value]) => 
        url.searchParams.set(key,value))
    }

    const res = await fetch(url.toString(), {
        next: { revalidate: revalidate}
    }); 

    if (!res.ok){
        throw new Error (`F1 API Error: ${res.json} - ${url.toString()}`)
    }

    const json = await res.json(); 
    return json.MRData as T; 

}