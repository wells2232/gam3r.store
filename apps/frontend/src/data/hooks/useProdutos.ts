'use client'
import { Produto } from '@gstore/core'
import { useCallback, useEffect, useState } from 'react'

const urlBase = 'http://localhost:4000/produtos'

export default function useProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([])

    async function obterProdutos(): Promise<Produto[]> {
        const resp = await fetch(`${urlBase}`)
        const produtos = await resp.json()
        return produtos ?? []
    }

    const obterProdutoPorId = useCallback(async function obterProdutoPorId(
        id: number
    ): Promise<Produto | null> {
        try {
            const resp = await fetch(`${urlBase}/${id}`)
            const produto = await resp.json()
            return produto ?? null
        } catch (error) {
            console.error('Erro ao obter produto por id', error)
            return null
        }
    }, [])

    useEffect(() => {
        obterProdutos().then(setProdutos)
    }, [])

    return {
        produtos,
        obterProdutoPorId,
    }
}
