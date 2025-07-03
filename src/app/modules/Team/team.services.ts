import { Team } from "./team.model"


const addTeam = async (payload: any, file: any) => {
  const teamData = {
    ...payload,
    coverImage: file?.path,
  }
  const result = await Team.create(teamData)
  return result
}

const getAllTeams = async () => {
  const teams = await Team.find()
  return teams
}

const getTeamById = async (id: string) => {
  const team = await Team.findById(id)
  if (!team) {
    throw new Error('Team not found')
  }
  return team
}

const updateTeam = async (id: string, payload: any, file: any) => {
  const updatedData = {
    ...payload,
    ...(file && { coverImage: file.path }),
  }
  const updatedTeam = await Team.findByIdAndUpdate(id, updatedData, {
    new: true,
  })
  return updatedTeam
}

const deleteTeam = async (id: string) => {
  const deletedTeam = await Team.findByIdAndDelete(id)
  return deletedTeam
}

export const TeamServices = {
  addTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
}
