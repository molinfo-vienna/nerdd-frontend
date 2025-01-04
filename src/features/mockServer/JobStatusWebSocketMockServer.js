import { Server as SocketServer } from "mock-socket"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { addOutputFile } from "../debug/debugSlice"
import recursiveCamelToSnakeCase from "./recursiveCamelToSnakeCase"

export default function JobStatusWebSocketMockServer({ job, pageSize }) {
    const [socketServer, setSocketServer] = useState(null)
    const moduleId = job.moduleId

    const jobResponse = {
        ...job,
        pageSize,
        // censor numEntriesTotal if showNumEntriesTotal is false
        numEntriesTotal: job.showNumEntriesTotal
            ? job.numEntriesTotal
            : undefined,
        showNumEntriesTotal: undefined,
        numPagesTotal: job.showNumEntriesTotal
            ? Math.ceil(job.numEntriesTotal / pageSize)
            : undefined,
        outputFiles: [],
    }

    // create a socket server
    useEffect(() => {
        const server = new SocketServer(
            `ws://localhost:3000/websocket/${moduleId}/jobs/${job.id}`,
        )

        // initially send the job status once when connecting
        server.on("connection", (socket) => {
            socket.send(JSON.stringify(recursiveCamelToSnakeCase(jobResponse)))
        })

        // save socket server
        setSocketServer(server)

        return () => {
            server.clients().forEach((client) => client.close())
            server.stop()
        }
    }, [moduleId, job.id, JSON.stringify(jobResponse)])

    // send the job status if job (specifically numPagesProcessed) changes
    useEffect(() => {
        if (socketServer !== null) {
            socketServer.clients().forEach((socket) => {
                socket.send(
                    JSON.stringify(recursiveCamelToSnakeCase(jobResponse)),
                )
            })
        }
    }, [socketServer, jobResponse])

    useEffect(() => {
        // after 5 seconds, add an output file
        const timeout = setTimeout(() => {
            addOutputFile({
                jobId: job.id,
                format: "sdf",
                url: "http://some_url.sdf",
            })
        }, 5000)

        return () => clearTimeout(timeout)
    })

    return null
}

JobStatusWebSocketMockServer.propTypes = {
    job: PropTypes.object.isRequired,
    pageSize: PropTypes.number.isRequired,
}
