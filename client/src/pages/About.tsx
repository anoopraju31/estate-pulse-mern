const AboutPage = () => {
	return (
		<main className='bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'>
			<div className='max-w-screen-xl min-h-[var(--container-min-height)] mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8 flex flex-col'>
				<section className='mt-4 md:mt-8 text-center'>
					<h1 className='text-3xl font-semibold'>About Us</h1>
					<p className='mt-2 md:mt-4'>
						Welcome to <span>Your Real Estate Website Name</span> – Your Trusted
						Partner in Real Estate
					</p>
				</section>

				<section className='my-6'>
					<h2 className='text-2xl font-semibold mb-2 text-center'>
						Our Mission
					</h2>
					<p>
						At <span>Your Real Estate Website Name</span>, our mission is to
						empower individuals and families in making informed decisions about
						buying, selling, or investing in real estate. We believe that a
						well-informed client is a satisfied client, and we strive to provide
						the resources and expertise you need to navigate the complex world
						of real estate.
					</p>
				</section>

				<section className='my-6'>
					<h2 className='text-2xl font-semibold mb-2 text-center'>
						What Sets Us Apart?
					</h2>
					<ul className='flex flex-col gap-4'>
						<li>
							<h3 className='text-lg font-bold mb-1'>Local Expertise</h3>
							<p>
								Our team consists of local experts who have an in-depth
								understanding of the real estate market in your area. We know
								the neighborhoods, schools, amenities, and market trends,
								ensuring that we can provide you with the most relevant and
								up-to-date information.
							</p>
						</li>
						<li>
							<h3 className='text-lg font-bold mb-1'>Personalized Service</h3>
							<p>
								We understand that every client is unique, and their real estate
								needs vary. Our dedicated agents take the time to understand
								your specific requirements and preferences to tailor our
								services to your individual needs.
							</p>
						</li>
						<li>
							<h3 className='text-lg font-bold mb-1'>
								Cutting-Edge Technology
							</h3>
							<p>
								We leverage the latest technology and tools to streamline your
								real estate experience. From advanced property search options to
								virtual tours and interactive maps, we offer a modern,
								user-friendly platform to help you find the right property.
							</p>
						</li>
						<li>
							<h3 className='text-lg font-bold mb-1'>Market Insights</h3>
							<p>
								Our team constantly monitors market trends, providing you with
								valuable insights and data to make informed decisions. Whether
								you're buying, selling, or investing, we'll keep you updated on
								the market's ever-changing dynamics.
							</p>
						</li>
						<li>
							<h3 className='text-lg font-bold mb-1'>Integrity and Trust</h3>
							<p>
								<span>Your Real Estate Website Name</span> is built on the
								foundation of trust, transparency, and ethical business
								practices. We are committed to maintaining the highest level of
								integrity in every interaction.
							</p>
						</li>
					</ul>
				</section>

				<section className='my-6'>
					<h2 className='text-2xl font-semibold mb-2 text-center'>
						Meet Our Team
					</h2>
					<p>
						Our team of dedicated real estate professionals is here to guide you
						through your real estate journey. With a diverse set of skills and
						extensive experience, we bring a wealth of knowledge to the table.
						Meet our team members <a href='/team'>here</a>.
					</p>
				</section>

				<section className='my-6'>
					<h2 className='text-2xl font-semibold mb-2 text-center'>
						Get in Touch
					</h2>
					<p>
						We are excited to help you achieve your real estate goals. Whether
						you're a first-time homebuyer, a seasoned investor, or someone
						looking to sell their property, we are here for you. Contact us
						today <a href='/contact'>here</a> and let us assist you in your real
						estate journey.
					</p>
				</section>
			</div>
		</main>
	)
}

export default AboutPage
