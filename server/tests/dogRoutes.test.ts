import { getDogImage } from '../controllers/dogController';
import {vi,  expect, test} from 'vitest'
import express from 'express'
import router from '../routes/dogRoutes';
import request from 'supertest'

vi.mock('../controllers/dogController')

// Minun piti luoda express sovellus tänne uudelleen, koska kun yritin importata sitä tuolta indexistä niin 
// se ajaa app.listen-kutsun, joka yrittää käynnistää palvelimen porttiin 5000 uudelleen ja se on jo käytössä.
        const app = express();
        app.use('/api/dogs', router);

        test('testing api/dogs/random', async () =>{
            const mockData = { imageUrl: "https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg", status: "success" }
            const mockResponse = {
                success: true,
                data: mockData
            }
            vi.mocked(getDogImage).mockImplementation(
                async(_req, res)=>{
                    res.json(mockResponse)
                })
            const response = await request(app).get('/api/dogs/random')

            expect(response.status).toBe(200)
            expect(response.body.success).toBe(true)
            expect(response.body.data.imageUrl).toContain(mockData.imageUrl)


        })

        test('testing the network error api/dogs/random', async () =>{            

            const mockResponse = {
                success: false,
                error: "Failed to fetch dog image: Network error"
            }
            vi.mocked(getDogImage).mockImplementation(
                async(_req, res)=>{
                    res.status(500).json(mockResponse)
                })
            const response = await request(app).get('/api/dogs/random')

            expect(response.status).toBe(500)
            expect(response.body.error).toBeDefined()



        })

