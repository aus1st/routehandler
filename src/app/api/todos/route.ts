import { headers } from 'next/dist/client/components/headers';
import { NextRequest, NextResponse } from 'next/server'

const DATA_SOURCE_URL: string = process.env.DATA_SOURCE_URL as string;
const DATA_API_KEY : string = process.env.DATA_SOURCE_KEY as string;

export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);

    const todos: Todo[]  = await res.json();
    return NextResponse.json(todos);
   }


   export async function DELETE(request: NextRequest) {
    const {id} : Partial<Todo> = await request.json();

    if(!id) return NextResponse.json({'message': `Todo id is required!`})
    
    const res = await fetch(`${DATA_SOURCE_URL}/${id}`,{
        method: 'DELETE',
        
        headers: {
            'content-Type': 'application/json',
            'API-KEY': DATA_API_KEY
        }
    })
    return NextResponse.json({'message':`record with ${id} has been deleted`});

    }


   export async function PUT(request: NextRequest) {
    const {userId,id, title, completed} : Todo = await request.json();

    if(!userId || !id || !title || typeof(completed)!== 'boolean') return NextResponse.json({'message': `Missing Required Data`})

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`,{
        method: 'PUT',        
        headers: {
            'content-Type': 'application/json',
            'API-KEY': DATA_API_KEY
        },
        body: JSON.stringify({userId,title, completed})
    })
    
    const updatedTodo: Todo = await res.json();

    return NextResponse.json(updatedTodo);

    }


   export async function POST(request: NextRequest) {
    const {userId, title} : Partial<Todo> = await request.json();

    if(!userId ||!title) return NextResponse.json({'message': `User ID  or Title is required!`})

    const res = await fetch(`${DATA_SOURCE_URL}`,{
        method: 'POST',        
        headers: {
            'content-Type': 'application/json',
            'API-KEY': DATA_API_KEY
        },
        body: JSON.stringify({userId,title, completed: false})
    })
    
    const newTodo: Todo = await res.json();

    return NextResponse.json(newTodo);

    }



   
   