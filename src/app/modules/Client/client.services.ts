import { Client } from "./client.model"


const addClient = async (payload: any) => {
  const clientData = {
    ...payload,
  }
  const result = await Client.create(clientData)
  return result
}

const getAllClients = async () => {
  const clients = await Client.find()
  return clients
}

const getClientById = async (id: string) => {
  const client = await Client.findById(id)
  if (!client) {
    throw new Error('Client not found')
  }
  return client
}

const updateClient = async (id: string, payload: any) => {
  const updatedData = {
    ...payload,
  }
  const updatedClient = await Client.findByIdAndUpdate(id, updatedData, {
    new: true,
  })
  return updatedClient
}

const deleteClient = async (id: string) => {
  const deletedClient = await Client.findByIdAndDelete(id)
  return deletedClient
}

export const ClientServices = {
  addClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
}
