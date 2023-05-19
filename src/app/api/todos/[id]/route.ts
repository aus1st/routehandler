
import { NextRequest, NextResponse } from 'next/server'

const DATA_SOURCE_URL: string = process.env.DATA_SOURCE_URL as string;

export async function GET(request: NextRequest) {
const id = request.url.slice(request.url.lastIndexOf('/')+1);

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`);
    const todo: Todo = await res.json();

  if(!todo) return NextResponse.json({'message':'Todo not found'});

    return NextResponse.json(todo);
   }
