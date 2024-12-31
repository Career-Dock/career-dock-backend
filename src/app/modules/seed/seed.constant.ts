import { TApplication } from "../application/application.interface";

export const dummyApplications: TApplication[] = [
    {
        clerkUserId: "user_2qccwdrIzaun7Cbd85UlzZcwvF3",
        applicationGroupId: "677167d32bdda2772cf0c132",
        jobTitle: "Frontend Developer",
        jobRole: "Developer",
        companyName: "TechCorp",
        country: "USA",
        appliedVia: "LinkedIn",
        companyEmail: "hr@techcorp.com",
        companyWebsite: "https://techcorp.com",
        companyPhoneNumber: "123-456-7890",
        jobPortal: "LinkedIn",
        address: "New York, USA",
        jobType: "remote",
        status: "Applied",
        appliedDate: new Date("2024-12-01"),
        notes: "Excited about this role",
        jobPostingURL: "https://jobposting.techcorp.com",
        resumeURL: "https://myresume.com/johndoe.pdf",
        salaryRange: "80,000 - 100,000 USD",
    },
    {
        clerkUserId: "user_2qccwdrIzaun7Cbd85UlzZcwvF3",
        applicationGroupId: "67716018c9ee1bf703930060",
        jobTitle: "Backend Engineer",
        jobRole: "Engineer",
        companyName: "CodeBase",
        country: "Canada",
        appliedVia: "Indeed",
        companyEmail: "careers@codebase.ca",
        companyWebsite: "https://codebase.ca",
        companyPhoneNumber: "987-654-3210",
        jobPortal: "Indeed",
        address: "Toronto, Canada",
        jobType: "onsite",
        status: "Interview_Scheduled",
        appliedDate: new Date("2024-11-30"),
        interviewDetails: { date: "2024-12-05", location: "Online" },
        notes: "Looking forward to the interview",
        jobPostingURL: "https://indeed.com/jobposting",
        resumeURL: "https://resumehosting.com/johndoe-backend.pdf",
        salaryRange: "90,000 - 110,000 CAD",
    },
    {
        clerkUserId: "user_2qccwdrIzaun7Cbd85UlzZcwvF3",
        applicationGroupId: "677167d32bdda2772cf0c132",
        jobTitle: "UI/UX Designer",
        jobRole: "Designer",
        companyName: "DesignPro",
        country: "UK",
        appliedVia: "Company Website",
        companyEmail: "jobs@designpro.co.uk",
        companyWebsite: "https://designpro.co.uk",
        companyPhoneNumber: "444-555-6666",
        jobPortal: "Website",
        address: "London, UK",
        jobType: "hybrid",
        status: "Rejected",
        appliedDate: new Date("2024-12-10"),
        notes: "Great portfolio submission experience",
        jobPostingURL: "https://designpro.co.uk/careers",
        resumeURL: "https://resumehosting.com/johndoe-uiux.pdf",
        salaryRange: "70,000 - 85,000 GBP",
    },
    {
        clerkUserId: "user_2qccwdrIzaun7Cbd85UlzZcwvF3",
        applicationGroupId: "67716018c9ee1bf703930060",
        jobTitle: "Data Scientist",
        jobRole: "Scientist",
        companyName: "DataGenix",
        country: "Germany",
        appliedVia: "Glassdoor",
        companyEmail: "hiring@datagenix.de",
        companyWebsite: "https://datagenix.de",
        companyPhoneNumber: "555-888-7777",
        jobPortal: "Glassdoor",
        address: "Berlin, Germany",
        jobType: "remote",
        status: "Offer_Received",
        appliedDate: new Date("2024-12-15"),
        interviewDetails: { date: "2024-12-20", location: "Onsite" },
        notes: "Highly competitive offer",
        jobPostingURL: "https://glassdoor.com/jobposting",
        resumeURL: "https://resumehosting.com/johndoe-datascience.pdf",
        salaryRange: "100,000 - 120,000 EUR",
    },
    {
        clerkUserId: "user_2qccwdrIzaun7Cbd85UlzZcwvF3",
        applicationGroupId: "677167d32bdda2772cf0c132",
        jobTitle: "DevOps Engineer",
        jobRole: "Engineer",
        companyName: "Opsify",
        country: "India",
        appliedVia: "Naukri",
        companyEmail: "recruitment@opsify.in",
        companyWebsite: "https://opsify.in",
        companyPhoneNumber: "666-999-0000",
        jobPortal: "Naukri",
        address: "Bangalore, India",
        jobType: "onsite",
        status: "Task_Received",
        appliedDate: new Date("2024-11-01"),
        notes: "Awaiting task submission deadline",
        jobPostingURL: "https://naukri.com/jobposting",
        resumeURL: "https://resumehosting.com/johndoe-devops.pdf",
        salaryRange: "1,200,000 - 1,500,000 INR",
    },
];
