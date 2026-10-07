import { getDogImage } from '../controllers/dogController';
import { getRandomDogImage } from '../services/dogService';
import {vi, expect, test} from 'vitest'
import { Request, Response } from 'express';


vi.mock('../services/dogService')



        test('palauttaa kuvan URL:n kun API onnistuu', async () =>{

            const mockData = { imageUrl: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg", status: "success" }
            const mockResponse = {
                success: true,
                data: mockData
            }

            vi.mocked(getRandomDogImage).mockResolvedValueOnce(mockData)
            const req = {} as Request
            const res = {json: vi.fn(), status: vi.fn().mockReturnThis()} as any
            //Piti laittaa tyypiksi any koska Response odottaa todellisuudessa paljon enemmän kenttiä
            //Menisi testi oikeasti läpi, mutta se on inhottavan näköinen kun herjaa tyyppivirhettä
            await getDogImage(req, res)
            expect(res.json).toHaveBeenCalledWith(mockResponse)
        })
