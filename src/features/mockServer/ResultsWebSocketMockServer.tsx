import { Server as SocketServer } from "mock-socket"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { generateResult } from "./fake"
import recursiveCamelToSnakeCase from "./recursiveCamelToSnakeCase"

type ResultsWebSocketMockServerProps = {
    job: {
        id: string | number
        jobType: string
        numEntriesProcessed: number
    }
    pageSize: number
}

export default function ResultsWebSocketMockServer({
    job,
    pageSize,
}: ResultsWebSocketMockServerProps) {
    const [socketServer, setSocketServer] = useState<SocketServer | null>(null)
    const moduleId = job.jobType

    const module = useSelector((state) => state.debug.moduleConfigs[moduleId])

    // create a socket server
    useEffect(() => {
        // Dynamically determine the port from window.location or fallback to 3000
        const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws"
        const wsHost = window.location.hostname
        const wsPort = window.location.port ? `:${window.location.port}` : ""
        const wsUrl = `${wsProtocol}://${wsHost}${wsPort}/websocket/${moduleId}/jobs/${job.id}/results`

        const server = new SocketServer(wsUrl)

        // initially send the job status once when connecting
        server.on("connection", (socket) => {})

        // save socket server
        setSocketServer(server)

        return () => {
            server.clients().forEach((client) => client.close())
            server.stop()
        }
    }, [moduleId, job.id])

    // send a new result if numEntriesProcessed changes
    useEffect(() => {
        if (socketServer !== null) {
            socketServer.clients().forEach((socket) => {
                const url = new URL(socket.url)

                // parse page from url
                const page = parseInt(url.searchParams.get("page"))

                // calculate the start and end index of the current page
                const start = (page - 1) * pageSize
                const end = page * pageSize

                const previousNumEntriesProcessed =
                    socket.previousNumEntriesProcessed || 0

                for (
                    let i = previousNumEntriesProcessed;
                    i < job.numEntriesProcessed;
                    i++
                ) {
                    // check if i is within the current page
                    if (start <= i && i < end) {
                        // generate the fake result
                        const results = generateResult(module, i)

                        // send the result to the client
                        for (const result of results) {
                            socket.send(
                                JSON.stringify(
                                    recursiveCamelToSnakeCase(result),
                                ),
                            )
                        }
                    }
                }

                // update the number of entries this socket has seen
                socket.previousNumEntriesProcessed = job.numEntriesProcessed

                // we close the socket to indicate that all results have been sent
                if (job.numEntriesProcessed >= end) {
                    socket.close()
                }
            })
        }
    }, [socketServer, job.numEntriesProcessed])

    return null
}
