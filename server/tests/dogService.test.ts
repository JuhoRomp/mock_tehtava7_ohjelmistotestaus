import { getRandomDogImage } from "../services/dogService";
import {vi, expect, test, afterEach, beforeEach} from 'vitest'

const mockedFetch = vi.fn();
global.fetch =mockedFetch


    beforeEach(()=>{
        mockedFetch.mockClear()
    })
    afterEach(()=>{
        vi.restoreAllMocks()
    })


        test('palauttaa kuvan URL:n kun API onnistuu', async () =>{
            const mockData = { message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg", status: "success" }
            mockedFetch.mockResolvedValueOnce({
                ok: true,
                json: async()=>mockData
            })
            const fetched = await getRandomDogImage()
            expect(fetched.imageUrl).toBe(mockData.message)
            expect(fetched.status).toBe(mockData.status)
            expect(mockedFetch).toHaveBeenCalledOnce()
        })

        test('palauttaa virheen jos API epäonnistuu', async () =>{

            mockedFetch.mockResolvedValueOnce({
                ok: false,
                status: 500
            })

            await expect(getRandomDogImage()).rejects.toThrow('Failed to fetch dog image: Dog API returned status 500')

        })
