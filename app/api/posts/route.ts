import { Post } from "@/app/backend/model/post";
import * as postRepository from "@/app/backend/repository/post.repository";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
    try {
        const posts: Post[] = await postRepository.obterTodos();
        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "falha ao carregar posts", error: error},
            { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const newPost: Post = await req.json();
        const validation = validatePostBody(newPost);

        if(!validation.isValid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            );
        }

        newPost.id = uuidv4();
        newPost.slug = newPost.title
            .toLowerCase()
            .replace(/\s/g, '-')
            .replace(/[^\w-]+/g, '');

        const createdPost: Post = await postRepository.salvar(newPost);
        return NextResponse.json(createdPost, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "falha ao cadastrar posts", error: error},
            { status: 500 })
    }
}

function validatePostBody(body: any): { isValid: boolean; error?: string} {
   if(!body) {
    return { isValid: false, error: "Corpo da requisição é obrigatório"};
   }

   const requiredFields = ['title', 'description', 'picture', 'content'];
   const missingFields = requiredFields.filter(field => !body[field]);

   if (missingFields.length > 0) {
    return {
        isValid: false,
        error: `Campos obrigatórios estão faltando: ${missingFields.join(', ')}`
    }
   }

   return { isValid: true};
}
