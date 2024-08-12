import React from 'react'
import './about.css'
const About = () => {
    return (
        <div className='container-fluid d-flex justify-content-center align-items-center about'>
            <div className="container">
                <div className="d-flex">
                <h1>
                    About Us
                </h1>

                </div>
                <p>
                    Welcome to our To-Do app, your ultimate productivity companion! Designed for simplicity and efficiency, our app helps you manage your tasks seamlessly. Whether you’re juggling personal projects, professional responsibilities, or daily errands, our intuitive interface makes it easy to stay organized and focused.
                </p>

                <h3>
                    Key Features:
                </h3>
                <ul>
                    <li>
                        <strong>User-Friendly Interface:</strong> Navigate effortlessly through your tasks with a clean and straightforward design.
                    </li>
                    <li>
                        <strong>Task Management: </strong>Create, edit, and delete tasks with just a few clicks. Organize them by priority or deadline to ensure you never miss a thing.
                    </li>
                    <li>
                        <strong> Reminders and Notifications:</strong> Set reminders for important tasks to keep you on track and accountable.
                    </li>
                    <li>
                        <strong>Categories and Tags:</strong> Sort your tasks into categories or tag them for easy retrieval, making it simple to find what you need quickly.
                    </li>
                    <li>
                        <strong>Cross-Device Sync:</strong> Access your tasks from any device, ensuring your to-do list is always at your fingertips.
                    </li>
                </ul>
                <h2>Our Mission</h2>
                <p>
                    We believe that effective task management can lead to greater productivity and less stress. Our mission is to provide users with a reliable tool that empowers them to take control of their time and achieve their goals.
                </p>
                <p>
                    Thank you for choosing our To-Do App. We’re excited to help you streamline your tasks and enhance your productivity!
                </p>


            </div>
        </div>
    )
}

export default About