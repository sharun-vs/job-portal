const JobExperienceLevelEnum = {
	BEGINNER: 'BEGINNER',
	INTERMEDIATE: 'INTERMEDIATE',
	PROFESSIONAL: 'PROFESSIONAL',
};

var experienceLevels = Object.keys(JobExperienceLevelEnum).map((key) => {
	return JobExperienceLevelEnum[key];
});

module.exports = { JobExperienceLevelEnum: JobExperienceLevelEnum, ExperienceLevels: experienceLevels };
