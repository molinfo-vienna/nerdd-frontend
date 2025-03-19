import { Server as SocketServer } from "mock-socket"
import { useEffect, useState } from "react"
import { addOutputFile } from "../debug/debugSlice"
import recursiveCamelToSnakeCase from "./recursiveCamelToSnakeCase"

type JobStatusWebSocketMockServerProps = {
    job: {
        id: string;
        jobType: string;
        numEntriesTotal: number;
        showNumEntriesTotal: boolean;
        [key: string]: any;
    };
    pageSize: number;
}

export default function JobStatusWebSocketMockServer({ job, pageSize }: JobStatusWebSocketMockServerProps) {
    const [socketServer, setSocketServer] = useState<SocketServer | null>(null)
    const moduleId = job.jobType

    const jobResponse = {
        ...job,
        pageSize,
        // do not return numEntriesTotal if showNumEntriesTotal is false
        numEntriesTotal: job.showNumEntriesTotal
            ? job.numEntriesTotal
            : undefined,
        numPagesTotal: job.showNumEntriesTotal
            ? Math.ceil(job.numEntriesTotal / pageSize)
            : undefined,
        outputFiles: [],
    }

    // create a socket server
    useEffect(() => {
        // Dynamically determine the port from window.location or fallback to 3000
        const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws"
        const wsHost = window.location.hostname
        const wsPort = window.location.port ? `:${window.location.port}` : ""
        const wsUrl = `${wsProtocol}://${wsHost}${wsPort}/websocket/${moduleId}/jobs/${job.id}`

        const server = new SocketServer(wsUrl)

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
    }, [moduleId, job.id])

    // send the job status if job (specifically numPagesProcessed) changes
    useEffect(() => {
        if (socketServer !== null) {
            socketServer.clients().forEach((socket) => {
                socket.send(
                    JSON.stringify(recursiveCamelToSnakeCase(jobResponse)),
                )
            })
        }
    }, [socketServer, JSON.stringify(jobResponse)])

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
