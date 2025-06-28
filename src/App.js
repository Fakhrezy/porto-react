import "./App.css";
import { useState, useEffect, useMemo } from "react";

function App() {
	const [displayText, setDisplayText] = useState("");
	const [currentTextIndex, setCurrentTextIndex] = useState(0);
	const [roleText, setRoleText] = useState("designer");
	const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
	const [showAllCertificates, setShowAllCertificates] = useState(false);
	const [showToolsOverlay, setShowToolsOverlay] = useState(true);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const textArray = useMemo(() => ["Hello World...", "I'm Deden Fahrul"], []);
	const roleArray = useMemo(
		() => [
			"designer",
			"developer",
			"data scientist",
			"learner",
			"network engineer"
		],
		[]
	);

	const certificatesData = useMemo(
		() => [
			{
				id: 1,
				image: "/images/js.jpg",
				title: "Programming",
				description: "basic javascript programming in Dicoding Academy",
				url: "https://www.dicoding.com/certificates/EYX4GW1D6ZDL"
			},
			{
				id: 2,
				image: "/images/js.jpg",
				title: "Programming",
				description: "basic python programming in Dicoding Academy",
				url: "https://www.dicoding.com/certificates/98XWEMJ5LXM3"
			},
			{
				id: 3,
				image: "/images/js.jpg",
				title: "Data Engineering",
				description: "data visualization in Dicoding Academy",
				url: "https://www.dicoding.com/certificates/53XED6GDVPRN"
			},
			{
				id: 4,
				image: "/images/js.jpg",
				title: "AI and Machine Learning",
				description: "basic machine learning in Dicoding Academy",
				url: "https://www.dicoding.com/certificates/1RXYE598KZVM"
			},
			{
				id: 5,
				image: "/images/js.jpg",
				title: "Management",
				description: "financial literacy in Dicoding Academy",
				url: "https://www.dicoding.com/certificates/NVP75RE7OXR0"
			},
			{
				id: 6,
				image: "/images/p3ri.jpg",
				title: "Organizing",
				description:
					"Organizing Committee of Ramadan and Eid al-Adha Program at Salman ITB",
				url:
					"https://drive.google.com/file/d/1uZ79BPqCgjfpiKVIaRXmYxpPYjPueYjd/view?usp=sharing"
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

	// Apply theme changes to document
	useEffect(
		() => {
			if (isDarkMode) {
				document.body.classList.add("dark-theme");
			} else {
				document.body.classList.remove("dark-theme");
			}
		},
		[isDarkMode]
	);

	// Toggle function for showing more certificates
	const toggleCertificates = () => {
		setShowAllCertificates(!showAllCertificates);
	};

	// Tools overlay functions
	const toggleToolsOverlay = () => {
		setShowToolsOverlay(!showToolsOverlay);
	};

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const downloadCV = () => {
		// Open Google Drive CV link in new tab
		window.open(
			"https://drive.google.com/file/d/1bBhbM3p2wa5Joec9Ixp-FtRl91xlNtNq/view",
			"_blank"
		);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	// Close mobile menu when clicking outside
	useEffect(
		() => {
			const handleClickOutside = event => {
				if (isMobileMenuOpen && !event.target.closest(".navbar")) {
					setIsMobileMenuOpen(false);
				}
			};

			document.addEventListener("click", handleClickOutside);
			return () => document.removeEventListener("click", handleClickOutside);
		},
		[isMobileMenuOpen]
	);

	const viewCertificate = url => {
		// Open certificate link in new tab
		window.open(url, "_blank");
	};

	// Function to handle navigation click and reset animations
	const handleNavClick = targetId => {
		// Close mobile menu if open
		setIsMobileMenuOpen(false);

		// Remove animate-in class from all elements to reset animations
		const animatedElements = document.querySelectorAll(".animate-in");
		animatedElements.forEach(el => {
			el.classList.remove("animate-in");
		});

		// Reset mask reveal animations specifically
		const maskRevealElements = document.querySelectorAll(".mask-reveal-title");
		maskRevealElements.forEach(el => {
			el.style.animation = "none";
		});

		// Smooth scroll to target section
		const targetElement = document.getElementById(targetId);
		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		}

		// Re-trigger animations after a small delay
		setTimeout(() => {
			const elementsToAnimate = document.querySelectorAll(
				`#${targetId} .scroll-animate, #${targetId} .scale-in, #${targetId} .certificate-card, #${targetId} .skill-logo, #${targetId} .mask-reveal-title`
			);
			elementsToAnimate.forEach(el => {
				if (el.getBoundingClientRect().top < window.innerHeight) {
					el.classList.add("animate-in");
					// Re-trigger mask reveal animation
					if (el.classList.contains("mask-reveal-title")) {
						el.style.animation = "";
					}
				}
			});
		}, 300);
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
					}
				});
			}, observerOptions);

			// Observe all sections and animatable elements
			const elementsToObserve = document.querySelectorAll(
				".section, .certificate-card, .skill-logo, .about-image, .certificate-image, .home-image, .scroll-animate, .scale-in, .mask-reveal-title"
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

					{/* Hamburger Menu Button */}
					<div
						className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
						onClick={toggleMobileMenu}>
						<span />
						<span />
						<span />
					</div>

					{/* Desktop Menu */}
					<ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
						<li className="nav-item">
							<a
								href="#home"
								className="nav-link"
								onClick={e => {
									e.preventDefault();
									handleNavClick("home");
								}}>
								Home
							</a>
						</li>
						<li className="nav-item">
							<a
								href="#about"
								className="nav-link"
								onClick={e => {
									e.preventDefault();
									handleNavClick("about");
								}}>
								About
							</a>
						</li>
						<li className="nav-item">
							<a
								href="#certificate"
								className="nav-link"
								onClick={e => {
									e.preventDefault();
									handleNavClick("certificate");
								}}>
								Certificate
							</a>
						</li>
						<li className="nav-item">
							<a
								href="#contact"
								className="nav-link"
								onClick={e => {
									e.preventDefault();
									handleNavClick("contact");
								}}>
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
									<button className="cta-button" onClick={downloadCV}>
										Download CV
									</button>
								</div>
							</div>
							<div className="home-image scale-in">
								<img
									src={isDarkMode ? "/images/me-dark.png" : "/images/me.png"}
									alt="profile"
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
										Profile
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
								src={
									isDarkMode ? "/images/about-dark.png" : "/images/about.png"
								}
								alt="About Me"
								onError={e => {
									e.target.style.display = "none";
								}}
							/>
						</div>
						<h2 className="about-title scroll-animate mask-reveal-title">
							About Me
						</h2>
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
								href="https://github.com/Fakhrezy"
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
								href="https://www.linkedin.com/in/dedenfahrul/"
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
								href="https://www.facebook.com/uapap.fhrl/"
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
								src={
									isDarkMode
										? "/images/certificate-dark.png"
										: "/images/certificate.png"
								}
								alt="My Certificates"
								onError={e => {
									e.target.style.display = "none";
								}}
							/>
						</div>
						<h2 className="certificate-title scroll-animate mask-reveal-title">
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
									<button
										className="certificate-btn"
										onClick={() => viewCertificate(cert.url)}>
										View Certificate
									</button>
								</div>
							)}
						</div>
						{certificatesData.length > 3 &&
							<div className="certificate-section-footer scroll-animate">
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
						<div className="contact-image scroll-animate">
							<img
								src={
									isDarkMode
										? "/images/contact-dark.png"
										: "/images/contact.png"
								}
								alt="Contact Me"
								onError={e => {
									e.target.style.display = "none";
								}}
							/>
						</div>
						<h2 className="scroll-animate mask-reveal-title">Contact Me</h2>
						<div className="contact-layout">
							<div className="contact-content">
								<p className="scroll-animate">
									Let's get in touch and discuss your next project!
								</p>
							</div>
							<div className="contact-info scroll-animate">
								<div className="contact-item">
									<strong>Email:</strong> dedenfahrulroziqin@gmail.com
								</div>
								<div className="contact-item">
									<strong>Phone:</strong> +62 8129 2760 255
								</div>
								<div className="contact-item">
									<strong>Location:</strong> Indonesia
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			{/* Tools Overlay */}
			<div className={`tools-overlay ${!showToolsOverlay ? "hidden" : ""}`}>
				<div
					className="tool-item"
					data-tooltip="Scroll to Top"
					onClick={scrollToTop}>
					<svg viewBox="0 0 24 24">
						<path d="m18 15-6-6-6 6" />
					</svg>
				</div>
				<div
					className="tool-item"
					data-tooltip={isDarkMode ? "Light Mode" : "Dark Mode"}
					onClick={toggleTheme}>
					{isDarkMode
						? <img src="/images/sun.png" alt="Light Mode" />
						: <svg viewBox="0 0 24 24">
								<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
							</svg>}
				</div>
				<div
					className="tool-item"
					data-tooltip="Download CV"
					onClick={downloadCV}>
					<svg viewBox="0 0 24 24">
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
						<polyline points="7,10 12,15 17,10" />
						<line x1="12" y1="15" x2="12" y2="3" />
					</svg>
				</div>
			</div>

			{/* Tools Toggle Button */}
			<div
				className={`tools-toggle ${!showToolsOverlay ? "active" : ""}`}
				onClick={toggleToolsOverlay}>
				<img src="/images/gear.png" alt="Tools Menu" />
			</div>
		</div>
	);
}

export default App;
