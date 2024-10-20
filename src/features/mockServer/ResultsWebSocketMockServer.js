import { Server as SocketServer } from "mock-socket"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { jobType } from "../../types"
import { generateResult } from "./fake"
import recursiveCamelToSnakeCase from "./recursiveCamelToSnakeCase"

export default function ResultsWebSocketMockServer({ job, pageSize }) {
    const [socketServer, setSocketServer] = useState(null)
    const moduleName = job.moduleName

    const module = useSelector((state) => state.debug.moduleConfigs[moduleName])

    // create a socket server
    useEffect(() => {
        const server = new SocketServer(
            `ws://localhost:3000/websocket/${moduleName}/jobs/${job.id}/results`,
        )

        // initially send the job status once when connecting
        server.on("connection", (socket) => {})

        // save socket server
        setSocketServer(server)

        return () => {
            server.clients().forEach((client) => client.close())
            server.stop()
        }
    }, [moduleName, job.id])

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

ResultsWebSocketMockServer.propTypes = {
    job: jobType.isRequired,
    pageSize: PropTypes.number.isRequired,
}
