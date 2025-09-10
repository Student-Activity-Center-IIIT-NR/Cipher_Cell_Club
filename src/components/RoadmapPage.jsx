import React, { useState, useEffect } from "react";
import useMobile from "../hooks/useMobile.js";
import "./RoadmapPage.css";
import roadmapData from "../data/roadmap.json"
import Footer from "./Footer.jsx";


const RoadmapPage = () => {
	const [progress, setProgress] = useState({});
	const [selectedChapter, setSelectedChapter] = useState(null);
	const [completedTopics, setCompletedTopics] = useState(new Set());
	const isMobile = useMobile();

	// Load progress from localStorage on component mount
	useEffect(() => {
		const savedProgress = localStorage.getItem("ciphercell-roadmap-progress");
		if (savedProgress) {
			const parsedProgress = JSON.parse(savedProgress);
			setProgress(parsedProgress);
			setCompletedTopics(new Set(Object.values(parsedProgress).flat()));
		}
	}, []);

	// Save progress to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem(
			"ciphercell-roadmap-progress",
			JSON.stringify(progress)
		);
	}, [progress]);

	const toggleTopicCompletion = (chapterId, topicId) => {
		const newProgress = { ...progress };

		if (!newProgress[chapterId]) {
			newProgress[chapterId] = [];
		}

		const topicIndex = newProgress[chapterId].indexOf(topicId);
		if (topicIndex > -1) {
			// Remove from completed
			newProgress[chapterId].splice(topicIndex, 1);
			setCompletedTopics((prev) => {
				const newSet = new Set(prev);
				newSet.delete(topicId);
				return newSet;
			});
		} else {
			// Add to completed
			newProgress[chapterId].push(topicId);
			setCompletedTopics((prev) => new Set([...prev, topicId]));
		}

		setProgress(newProgress);
	};

	const getChapterProgress = (chapter) => {
		const completedInChapter = progress[chapter.id]
			? progress[chapter.id].length
			: 0;
		const totalInChapter = chapter.topics.length;
		return Math.round((completedInChapter / totalInChapter) * 100);
	};

	const getTotalProgress = () => {
		const totalTopics = roadmapData.reduce(
			(sum, chapter) => sum + chapter.topics.length,
			0
		);
		const completedTopics = Object.values(progress).reduce(
			(sum, chapterProgress) => sum + chapterProgress.length,
			0
		);
		return Math.round((completedTopics / totalTopics) * 100);
	};

	const getDifficultyColor = (difficulty) => {
		switch (difficulty) {
			case "Beginner":
				return "#10b981";
			case "Intermediate":
				return "#f59e0b";
			case "Advanced":
				return "#ef4444";
			case "Expert":
				return "#8b5cf6";
			default:
				return "#6b7280";
		}
	};

	return (
		<div className="roadmap-page">
			{/* Header Section */}
			<section className="roadmap-header">
				<div className="roadmap-container">
					<div className="header-content">
						<div className="terminal-badge">
							<span className="terminal-prompt">root@ciphercell:~#</span>
							<span className="terminal-command">init-learning-path</span>
						</div>
						<h1 className="roadmap-title">
							<span className="achievements-title">CYBER</span>
							<span className="achievements-title">SECURITY</span>
							<br />
							<span className="title-sub">LEARNING ROADMAP</span>
						</h1>
						<p className="roadmap-description">
							Master cybersecurity from fundamentals to advanced techniques.
							Track your progress and unlock your potential as an ethical
							hacker.
						</p>

						{/* Overall Progress */}
						<div className="overall-progress">
							<div className="progress-header">
								<span className="progress-label">Overall Progress</span>
								<span className="progress-percentage">
									{getTotalProgress()}%
								</span>
							</div>
							<div className="progress-bar">
								<div
									className="progress-fill"
									style={{ width: `${getTotalProgress()}%` }}
								></div>
							</div>
							<div className="progress-stats">
								<span>
									{Object.values(progress).reduce(
										(sum, ch) => sum + ch.length,
										0
									)}{" "}
									topics completed
								</span>
								<span>•</span>
								<span>
									{roadmapData.reduce((sum, ch) => sum + ch.topics.length, 0)}{" "}
									total topics
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Roadmap Grid */}
			<section className="roadmap-content">
				<div className="roadmap-container">
					<div className="chapters-grid">
						{roadmapData.map((chapter, index) => (
							<div
								key={chapter.id}
								className={`chapter-card ${
									selectedChapter === chapter.id ? "active" : ""
								}`}
								onClick={() =>
									setSelectedChapter(
										selectedChapter === chapter.id ? null : chapter.id
									)
								}
							>
								<div className="chapter-header">
									<div
										className="chapter-icon"
										style={{ color: chapter.color }}
									>
										{chapter.icon}
									</div>
									<div className="chapter-info">
										<h3 className="chapter-title">{chapter.title}</h3>
										<p className="chapter-description">{chapter.description}</p>
										<div className="chapter-meta">
											<span className="estimated-time">
												⏱️ {chapter.estimatedTime}
											</span>
											<span className="chapter-progress">
												{getChapterProgress(chapter)}% Complete
											</span>
										</div>
									</div>
									<div className="chapter-progress-ring">
										<svg className="progress-ring" width="60" height="60">
											<circle
												className="progress-ring-circle-bg"
												stroke="#1e293b"
												strokeWidth="4"
												fill="transparent"
												r="26"
												cx="30"
												cy="30"
											/>
											<circle
												className="progress-ring-circle"
												stroke={chapter.color}
												strokeWidth="4"
												fill="transparent"
												r="26"
												cx="30"
												cy="30"
												style={{
													strokeDasharray: `${2 * Math.PI * 26}`,
													strokeDashoffset: `${
														2 *
														Math.PI *
														26 *
														(1 - getChapterProgress(chapter) / 100)
													}`,
												}}
											/>
										</svg>
										<span className="progress-text">
											{getChapterProgress(chapter)}%
										</span>
									</div>
								</div>

								{/* Topics List (Expandable) */}
								{selectedChapter === chapter.id && (
									<div className="topics-list">
										<div className="topics-header">
											<h4>Chapter Topics</h4>
											<span className="topics-count">
												{chapter.topics.length} topics
											</span>
										</div>
										<div className="topics-grid">
											{chapter.topics.map((topic, topicIndex) => {
												const isCompleted = completedTopics.has(topic.id);
												return (
													<div
														key={topic.id}
														className={`topic-item ${
															isCompleted ? "completed" : ""
														}`}
														onClick={(e) => {
															e.stopPropagation();
															toggleTopicCompletion(chapter.id, topic.id);
														}}
													>
														<div className="topic-checkbox">
															{isCompleted ? (
																<div className="checkbox-checked">
																	<svg
																		width="16"
																		height="16"
																		viewBox="0 0 24 24"
																		fill="none"
																		xmlns="http://www.w3.org/2000/svg"
																	>
																		<path
																			d="M20 6L9 17L4 12"
																			stroke="currentColor"
																			strokeWidth="2"
																			strokeLinecap="round"
																			strokeLinejoin="round"
																		/>
																	</svg>
																</div>
															) : (
																<div className="checkbox-unchecked"></div>
															)}
														</div>
														<div className="topic-content">
															<h5 className="topic-title">{topic.title}</h5>
															<div className="topic-meta">
																<span
																	className="difficulty-badge"
																	style={{
																		backgroundColor: getDifficultyColor(
																			topic.difficulty
																		),
																	}}
																>
																	{topic.difficulty}
																</span>
															</div>
														</div>
														<div className="topic-status">
															{isCompleted ? (
																<span className="status-completed">
																	✓ Completed
																</span>
															) : (
																<span className="status-pending">
																	○ Pending
																</span>
															)}
														</div>
													</div>
												);
											})}
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Achievement Section */}
			<section className="achievements-section">
				<div className="roadmap-container">
					<div className="achievements-content">
						<h2 className="achievements-title">Your Cybersecurity Journey</h2>
						<div className="achievements-grid">
							<div className="achievement-card">
								<div className="achievement-icon">🏆</div>
								<div className="achievement-info">
									<h4>Progress Tracker</h4>
									<p>{getTotalProgress()}% of roadmap completed</p>
								</div>
							</div>
							<div className="achievement-card">
								<div className="achievement-icon">⭐</div>
								<div className="achievement-info">
									<h4>Topics Mastered</h4>
									<p>
										{Object.values(progress).reduce(
											(sum, ch) => sum + ch.length,
											0
										)}{" "}
										out of{" "}
										{roadmapData.reduce((sum, ch) => sum + ch.topics.length, 0)}
									</p>
								</div>
							</div>
							<div className="achievement-card">
								<div className="achievement-icon">🎯</div>
								<div className="achievement-info">
									<h4>Chapters Active</h4>
									<p>
										{Object.keys(progress).length} out of {roadmapData.length}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default RoadmapPage;
