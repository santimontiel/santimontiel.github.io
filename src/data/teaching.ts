export interface TeachingEntry {
	title: string;
	level: string;
	quarters: string;
}

export const teaching: TeachingEntry[] = [
	{
		title: 'iRoboCity2030 Summer School 2026: ROS 2, AI and Field Robotics',
		level: 'Summer School',
		quarters: 'June 2026',
	},
	{
		title: 'Perception Systems',
		level: 'M.Sc.',
		quarters: 'Q2 24-25 / Q2 25-26',
	},
	{
		title: 'Computer Vision / Computer Vision Systems',
		level: 'B.Sc.',
		quarters: 'Q2 23-24 / Q1 24-25 / Q1-Q2 25-26',
	},
	{
		title: 'Introduction to Autonomous Vehicles with CARLA Simulator',
		level: 'Workshop',
		quarters: 'Summer 2023',
	},
];
