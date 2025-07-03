import { Technology } from "./technology.model"


const addTechnology = async (payload: any, file: any) => {
  const technologyData = {
    ...payload,
    image: file?.path,
  }
  const result = await Technology.create(technologyData)
  return result
}

const getAllTechnologies = async () => {
  const technologies = await Technology.find()
  return technologies
}

const getTechnologyById = async (id: string) => {
  const technology = await Technology.findById(id)
  if (!technology) {
    throw new Error('Technology not found')
  }
  return technology
}

const updateTechnology = async (id: string, payload: any, file: any) => {
  const updatedData = {
    ...payload,
    ...(file && { image: file.path }),
  }
  const updatedTechnology = await Technology.findByIdAndUpdate(id, updatedData, {
    new: true,
  })
  return updatedTechnology
}

const deleteTechnology = async (id: string) => {
  const deletedTechnology = await Technology.findByIdAndDelete(id)
  return deletedTechnology
}

export const TechnologyServices = {
  addTechnology,
  getAllTechnologies,
  getTechnologyById,
  updateTechnology,
  deleteTechnology,
}
