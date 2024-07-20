import { Stack, Typography } from "@mui/material"
import { motion } from "framer-motion";
import React from "react";

export type TimelineAnimationControls = {
	start: () => void,
	reset: () => void
}

export type TimelineProps = {
	nDots?: number,
	controlsRef: React.MutableRefObject<TimelineAnimationControls>,
	tasks: string[],
}

const circleRadius = 42;
const weekStartX = 133;
const weekStride = 164;
const weekY = 223;

const lineHeight = 39;

const taskRectHeight = 112;
const taskRectWidth = 176;

const weekTypographyOffsetY = 3;

const scaleXVariants = {
	initial: { scaleX: 0 },
	animate: { scaleX: 1 },
}

const scaleVariants = {
	initial: { scale: 0 },
	animate: { scale: 1 },
}

const WeekTypography = ({ children, x, y }: { children: string, x: number, y: number }) => (
	<Typography component={motion.text} variant="title1"
		fontWeight="bold"
		textAnchor="middle" dominantBaseline="middle"
		x={x} y={y + weekTypographyOffsetY}
		fill="currentColor"
		variants={scaleVariants}
	>
		{children}
	</Typography>
)

const TaskTypography = ({ children, x, y, w, h }: { children: string, x: number, y: number, w: number, h: number }) => (
	<motion.foreignObject
		x={x} y={y} width={w} height={h}
		variants={scaleVariants}
	>
		<Stack justifyContent="center" height="100%">
			<Typography component="p" variant="body1" textAlign="center" lineHeight={1}>
				{children}
			</Typography>
		</Stack>
	</motion.foreignObject>
)

function Week({ number, task, end }: { number: number, task: string, end?: boolean }) {
	end ??= false;
	const x = weekStartX + (number - 1) * weekStride;
	const taskUp = number % 2 == 1;
	const taskSign = taskUp ? 1 : -1;

	const lineStartY = weekY - taskSign * 50;
	const lineEndY = lineStartY - taskSign * lineHeight;

	const rectX = x - taskRectWidth / 2;
	const rectY = lineEndY - (taskSign + 1) / 2 * (taskRectHeight) - taskSign * 7;

	return <g>
		<motion.circle cx={x} cy={weekY} r={circleRadius} stroke="#FF4466" strokeWidth="16"
			variants={scaleVariants}
		/>
		<WeekTypography x={x} y={weekY}>{`W${number.toString()}`}</WeekTypography>
		<motion.line
			x1={x - 1} y1={lineStartY} x2={x - 1} y2={lineEndY} stroke="#FF4466" strokeWidth="8" strokeDasharray="16 8"
			variants={{
				initial: { y2: lineStartY },
				animate: { y2: lineEndY }
			}}
		/>
		{/*  */}
		<motion.rect x={rectX} y={rectY} width={taskRectWidth} height={taskRectHeight} rx="24" stroke="#FF4466" strokeWidth="16"
			variants={scaleVariants}
		/>
		{/* the text within the bubble */}
		<TaskTypography x={rectX + 8} y={rectY + 8} w={taskRectWidth - 16} h={taskRectHeight - 16}>{task}</TaskTypography>
		{/* the connector */}
		<motion.rect
			x={x + 40} y="209" width="80" height="32" fill="#FF4466"
			style={{ transformBox: "fill-box" }}
			variants={{
				initial: { width: 0 },
				animate: { width: 80 },
			}}
			rx={end ? 8 : 0}
		/>
	</g>
}

export default function Timeline(props: TimelineProps) {
	let {
		nDots = 3,
		controlsRef: animateRef,
		tasks,
	} = props;
	const nWeeks = tasks.length;

	const [animating, setAnimating] = React.useState(false);
	animateRef.current = {
		start: () => setAnimating(true),
		reset: () => setAnimating(false),
	}

	const lastWeekX = weekStartX + (nWeeks - 1) * weekStride;
	const lastRectX = lastWeekX + 80 + circleRadius;


	return <motion.svg
		width="1408" height="445" viewBox="0 0 1408 445" fill="none" xmlns="http://www.w3.org/2000/svg"
		variants={{
			initial: {},
			animate: {
				transition: {
					staggerChildren: 0.1
				}
			},
		}}
		animate={animating ? "animate" : "initial"}
	>
		{ Array.from({ length: nWeeks }).map((_, i, arr) => (
			<Week key={i} number={i + 1} task={tasks[i]} end={i === arr.length - 1 }/>
		))}

		<g>
			{Array.from({ length: nDots + 1 }).map((_, i, arr) =>
				i !== arr.length - 1
					? (
						<motion.g
							variants={scaleVariants}
							key={i}
						>
							<circle key={i}
								cx={lastRectX + 16 + 32 * i} cy="225" r="8" fill="#FF4466"
							/>
						</motion.g>
					)
					: (
						<motion.g
							key={i}
							variants={scaleVariants}
						>
							<path transform={`translate(${lastRectX + 16 + 32 * i - 8} ${228 - 16})`} key={i} d="M0 19.9237C0 23.2338 3.79117 25.1115 6.42417 23.1054L16.824 15.1817C18.9251 13.5809 18.9251 10.4191 16.824 8.81827L6.42417 0.894608C3.79117 -1.11149 0 0.766179 0 4.07634V19.9237Z" fill="#FF4466" />
						</motion.g>
					)
			)}
		</g>
	</motion.svg>
}
