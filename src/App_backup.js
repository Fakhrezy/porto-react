import "./App.css";
import { useState, useEffect, useMemo } from "react";

function App() {
	const [displayText, setDisplayText] = useState("");
	const [currentTextIndex, setCurrentTextIndex] = useState(0);
	const [roleText, setRoleText] = useState("designer");
	const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
	const [showAllCertificates, setShowAllCertificates] = useState(false);
	const [visibleSections, setVisibleSections] = useState(new Set());

	const textArray = useMemo(() => ["Hello World...", "I'm Deden Fahrul"], []);
	const roleArray = useMemo(
		() => ["designer", "developer", "data scientist", "learner"],
		[]
	);

	const certificatesData = useMemo(
		() => [
			{
				id: 1,
				image: "/images/js.jpg",
				title: "Dicoding",
				description: "basic javascript programming"
			},
			{
				id: 2,
				image: "/images/js.jpg",
				title: "Dicoding",
				description: "basic python programming"
			},
			{
				id: 3,
				image: "/images/js.jpg",
				title: "Dicoding",
				description: "data visualization"
			},
			{
				id: 4,
				image: "/images/js.jpg",
				title: "Dicoding",
				description: "basic machine learning"
			},
			{
				id: 5,
				image: "/images/js.jpg",
				title: "Dicoding",
				description: "financial literacy"
			},
			{
				id: 6,
				image: "/images/p3ri.jpg",
				title: "Salman ITB",
				description: "Organizing Committee of Ramadan and Eid al-Adha Program"
			}
		],
		[]
	);

	useEffect(
		() => {
			let timeoutId;
			let currentIndex = 0;
			const currentText = textArray[currentTextIndex];

			const typeText = () => {
				if (currentIndex <= currentText.length) {
					setDisplayText(currentText.slice(0, currentIndex));
					currentIndex++;
					timeoutId = setTimeout(typeText, 150); // Speed of typing
				} else {
					// Wait 2 seconds then start erasing
					timeoutId = setTimeout(() => {
						eraseText();
					}, 2000);
				}
			};

			const eraseText = () => {
				if (currentIndex > 0) {
					currentIndex--;
					setDisplayText(currentText.slice(0, currentIndex));
					timeoutId = setTimeout(eraseText, 100); // Speed of erasing
				} else {
					// Move to next text and start typing again
					timeoutId = setTimeout(() => {
						setCurrentTextIndex(
							prevIndex => (prevIndex + 1) % textArray.length
						);
					}, 1000);
				}
			};

			typeText();

			return () => clearTimeout(timeoutId);
		},
		[currentTextIndex, textArray]
	);

	// Role text animation effect
	useEffect(
		() => {
			const roleTimer = setInterval(() => {
				setCurrentRoleIndex(prevIndex => (prevIndex + 1) % roleArray.length);
			}, 3000); // Change role every 3 seconds

			return () => clearInterval(roleTimer);
		},
		[roleArray]
	);

	useEffect(
		() => {
			setRoleText(roleArray[currentRoleIndex]);
		},
		[currentRoleIndex, roleArray]
	);

	// Toggle function for showing more certificates
	const toggleCertificates = () => {
		setShowAllCertificates(!showAllCertificates);
	};

	// Get certificates to display
	const certificatesToShow = showAllCertificates
		? certificatesData
		: certificatesData.slice(0, 3);

	// Mouse follow glow effect for certificate cards
	useEffect(() => {
		const handleMouseMove = e => {
			const cards = document.querySelectorAll(".certificate-card");
			cards.forEach(card => {
				const rect = card.getBoundingClientRect();
				const x = (e.clientX - rect.left) / rect.width * 100;
				const y = (e.clientY - rect.top) / rect.height * 100;

				// Only update if mouse is within the card boundaries
				if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
					card.style.setProperty("--mouse-x", `${x}%`);
					card.style.setProperty("--mouse-y", `${y}%`);
				}
			});
		};

		const cards = document.querySelectorAll(".certificate-card");
		cards.forEach(card => {
			card.addEventListener("mousemove", handleMouseMove);
			card.addEventListener("mouseenter", handleMouseMove);
		});

		return () => {
			cards.forEach(card => {
				card.removeEventListener("mousemove", handleMouseMove);
				card.removeEventListener("mouseenter", handleMouseMove);
			});
		};
	}, []);

	// Scroll animation effect
	useEffect(
		() => {
			const observerOptions = {
				threshold: 0.1,
				rootMargin: "0px 0px -50px 0px"
			};

			const observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add("animate-in");
						setVisibleSections(prev =>
							new Set(prev).add(entry.target.id || entry.target.className)
						);
					}
				});
			}, observerOptions);

			// Observe all sections and animatable elements
			const elementsToObserve = document.querySelectorAll(
				".section, .certificate-card, .skill-logo, .about-image, .certificate-image, .home-image, .scroll-animate, .scale-in"
			);

			elementsToObserve.forEach(el => observer.observe(el));

			return () => observer.disconnect();
		},
		[showAllCertificates]
	); // Re-run when certificates change

	return (
		<div className="App">
			<nav className="navbar">
				<div className="nav-container">
					<div className="nav-logo">
						<a href="#home">Portfolio</a>
					</div>
					<ul className="nav-menu">
						<li className="nav-item">
							<a href="#home" className="nav-link">
								Home
							</a>
						</li>
						<li className="nav-item">
							<a href="#about" className="nav-link">
								About
							</a>
						</li>
						<li className="nav-item">
							<a href="#certificate" className="nav-link">
								Certificate
							</a>
						</li>
						<li className="nav-item">
							<a href="#contact" className="nav-link">
								Contact
							</a>
						</li>
					</ul>
				</div>
			</nav>

			{/* Main Content Sections */}
			<main>
				{/* Home Section */}
				<section id="home" className="section">
					<div className="home-bg-glass">
						<img
							src="/images/glass1.png"
							alt="Background Glass"
							className="home-glass-bg"
							onError={e => {
								e.target.style.display = "none";
							}}
						/>
					</div>
					<div className="container">
						<div className="home-content">
							<div className="home-text">
								<div className="home-text-content">
									<h1>
										{displayText}
										<span className="typing-cursor">|</span>
									</h1>
									<p>
										Welcome to my Portfolio! <br />
										People know me as {" "}
										<span className="role-text" key={currentRoleIndex}>
											{roleText}
										</span>
									</p>
									<button className="cta-button">Get Started</button>
								</div>
							</div>
							<div className="home-image scale-in">
								<img
									src="/images/me.png"
									alt="Computer"
									onError={e => {
										e.target.style.display = "none";
										e.target.nextSibling.style.display = "block";
									}}
								/>
								<svg
									style={{ display: "none" }}
									width="300"
									height="300"
									viewBox="0 0 300 300"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<rect
										x="50"
										y="80"
										width="200"
										height="120"
										rx="8"
										fill="rgba(255,255,255,0.2)"
										stroke="rgba(255,255,255,0.3)"
										strokeWidth="2"
									/>
									<rect
										x="60"
										y="90"
										width="180"
										height="90"
										fill="rgba(255,255,255,0.1)"
									/>
									<rect
										x="130"
										y="200"
										width="40"
										height="30"
										fill="rgba(255,255,255,0.2)"
									/>
									<rect
										x="80"
										y="230"
										width="140"
										height="8"
										rx="4"
										fill="rgba(255,255,255,0.2)"
									/>
									<circle
										cx="150"
										cy="140"
										r="15"
										fill="rgba(255,255,255,0.3)"
									/>
									<text
										x="150"
										y="270"
										textAnchor="middle"
										fill="rgba(255,255,255,0.6)"
										fontSize="12">
										Computer Illustration
									</text>
								</svg>
							</div>
						</div>
					</div>
				</section>

				{/* About Section */}
				<section id="about" className="section">
					<div className="about-bg-glass">
						<img
							src="/images/glass2.png"
							alt="Background Glass"
							className="about-glass-bg"
							onError={e => {
								e.target.style.display = "none";
							}}
						/>
					</div>
					<div className="container">
						<div className="about-image scroll-animate">
							<img
								src="/images/about.png"
								alt="About Me"
								onError={e => {
									e.target.style.display = "none";
								}}
							/>
						</div>
						<h2 className="about-title scroll-animate">About Me</h2>
						<p className="scroll-animate">
							Hey there! I'm passionate about all things tech—whether it's
							diving into data science and machine learning, tinkering with
							computer networks, or building clean, responsive web and mobile
							apps. I also enjoy crafting eye-catching visuals through graphic
							design. For me, combining logic and creativity is what makes tech
							so exciting—there's always something new to explore, build, or
							improve.
						</p>
						<div className="skills">
							<a
								href="https://www.instagram.com/dn.fahrul/"
								target="_blank"
								rel="noopener noreferrer"
								className="skill-link">
								<div className="skill-logo scale-in">
									<img
										src="/images/ig.png"
										alt="Instagram"
										onError={e => {
											e.target.style.display = "none";
										}}
									/>
								</div>
							</a>
							<a
								href="https://www.instagram.com/dn.fahrul/"
								target="_blank"
								rel="noopener noreferrer"
								className="skill-link">
								<div className="skill-logo scale-in">
									<img
										src="/images/git.png"
										alt="Github"
										onError={e => {
											e.target.style.display = "none";
										}}
									/>
								</div>
							</a>
							<a
								href="https://www.instagram.com/dn.fahrul/"
								target="_blank"
								rel="noopener noreferrer"
								className="skill-link">
								<div className="skill-logo scale-in">
									<img
										src="/images/in.png"
										alt="LindkedIn"
										onError={e => {
											e.target.style.display = "none";
										}}
									/>
								</div>
							</a>
							<a
								href="https://www.instagram.com/dn.fahrul/"
								target="_blank"
								rel="noopener noreferrer"
								className="skill-link">
								<div className="skill-logo scale-in">
									<img
										src="/images/fb.png"
										alt="Facebook"
										onError={e => {
											e.target.style.display = "none";
										}}
									/>
								</div>
							</a>
						</div>
					</div>
				</section>

				{/* Certificate Section */}
				<section id="certificate" className="section">
					<div className="container">
						<div className="certificate-image scroll-animate">
							<img
								src="/images/certificate.png"
								alt="My Certificates"
								onError={e => {
									e.target.style.display = "none";
								}}
							/>
						</div>
						<h2 className="certificate-title scroll-animate">
							My Certificates
						</h2>
						<div className="certificates-grid">
							{certificatesToShow.map(cert =>
								<div key={cert.id} className="certificate-card">
									<div className="certificate-preview">
										<img
											src={cert.image}
											alt="Certificate"
											onError={e => {
												e.target.style.display = "none";
											}}
										/>
									</div>
									<h3>
										{cert.title}
									</h3>
									<p>
										{cert.description}
									</p>
									<button className="certificate-btn">View Certificate</button>
								</div>
							)}
						</div>
						{certificatesData.length > 3 &&
							<div className="certificate-section-footer">
								<button className="view-more-btn" onClick={toggleCertificates}>
									{showAllCertificates ? "Show Less" : "View More..."}
								</button>
							</div>}
					</div>
				</section>

				{/* Glass Foreground Element */}
				<img
					src="/images/glass3.png"
					alt="Glass Foreground"
					className="glass3-foreground"
					onError={e => {
						e.target.style.display = "none";
					}}
				/>

				{/* Contact Section */}
				<section id="contact" className="section">
					<div className="contact-bg-glass">
						<img
							src="/images/glass1.png"
							alt="Contact Background Glass"
							className="contact-glass1-bg"
							onError={e => {
								e.target.style.display = "none";
							}}
						/>
					</div>
					<div className="container">
						<h2 className="scroll-animate">Contact Me</h2>
						<p className="scroll-animate">
							Let's get in touch and discuss your next project!
						</p>
						<div className="contact-info scroll-animate">
							<div className="contact-item">
								<strong>Email:</strong> your.email@example.com
							</div>
							<div className="contact-item">
								<strong>Phone:</strong> +62 123 456 789
							</div>
							<div className="contact-item">
								<strong>Location:</strong> Indonesia
							</div>
						</div>
						<button className="contact-btn scroll-animate">Send Message</button>
					</div>
				</section>
			</main>
		</div>
	);
}

export default App;
