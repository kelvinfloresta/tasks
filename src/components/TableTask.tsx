import { TaskListOutput } from "../services/tasks.interface";
import { differenceInMonths, format, addMonths } from 'date-fns'
import {  useMemo } from "react";

export function parseHeader(input: TaskListOutput) {
    if (input.tasks.length === 0) {
        return []
    }

    let startDate = input.tasks[0].startDate
    let endDate = input.tasks[0].endDate

    input.tasks.forEach(el => {
        if(startDate > el.startDate) {
            startDate = el.startDate
        }

        if (endDate < el.endDate) {
            endDate = el.endDate
        }
    })

    const startAsDate = new Date(startDate)
    const diff = differenceInMonths(new Date(endDate), startAsDate) + 1

    const months=  new Array(diff).fill(null)
    .map((_, i) => format(addMonths(startAsDate, i), "MM/yyyy"))

    return ["Tarefas", ...months, "Total"]
}

export function parseBody(input: TaskListOutput) {
    let startDate = input.tasks[0].startDate
    let endDate = input.tasks[0].endDate

    input.tasks.forEach(el => {
        if(startDate > el.startDate) {
            startDate = el.startDate
        }

        if (endDate < el.endDate) {
            endDate = el.endDate
        }
    })

    const minDate = new Date(startDate)
    const maxDate = new Date(endDate);

    return input.tasks.map(el => {
        const diffStart = differenceInMonths(new Date(el.startDate), minDate)
        const emptyStart = new Array(diffStart).fill(null)
        const diffEnd = differenceInMonths(maxDate, new Date(el.endDate))
        const emptyEnd = new Array(diffEnd).fill(null)

        const diffRow = differenceInMonths(new Date(el.endDate), new Date(el.startDate)) + 1
        const values = new Array(diffRow).fill(null).map(() => el.totalCost / diffRow)

        return [el.name, ...emptyStart, ...values, ...emptyEnd, el.totalCost]
    })
}


interface TableTaskProps {
    readonly data: TaskListOutput;
}

export function TableTask({data}: TableTaskProps) {


    const header = useMemo(() => {
        return parseHeader(data)
    }, [data])

    const body = useMemo(() => {
        return parseBody(data)
    }, [data])

    return (
        <table border={1}>
            <tr>
                {header.map(el => <th>{el}</th>)}
            </tr>

            
            {body.map(el => <tr>{el.map(row => <td>{row}</td>)}</tr>)}
            
        </table>
  )
}