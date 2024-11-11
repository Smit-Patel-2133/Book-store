import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        adharCardNumber: '',
        driverLicenseNumber: '',
        adharCardImage: null,
        driverLicenseImage: null,
    });
    const [errors, setErrors] = useState({
        adharCardImage: '',
        driverLicenseImage: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file && file.size > 2 * 1024 * 1024) {
            setErrors({ ...errors, [name]: 'File size should be under 2 MB' });
            setFormData({ ...formData, [name]: null });
        } else {
            setErrors({ ...errors, [name]: '' });
            setFormData({ ...formData, [name]: file });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    return (
        <div className="signup-page">
            <h2 className="signup-title">Delivery Perstion Signup</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label className="signup-label">First Name:
                    <input className="signup-input" type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </label>
                <label className="signup-label">Last Name:
                    <input className="signup-input" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </label>
                <label className="signup-label">Email:
                    <input className="signup-input" type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label className="signup-label">Mobile Number:
                    <input
                        className="signup-input"
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{10}"
                        maxLength="10"
                        title="Please enter a 10-digit mobile number"
                    />
                </label>
                <label className="signup-label">Aadhaar Card Number:
                    <input
                        className="signup-input"
                        type="text"
                        name="adharCardNumber"
                        value={formData.adharCardNumber}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{12}"
                        maxLength="12"
                        title="Please enter a 12-digit Aadhaar number"
                    />
                </label>
                <label className="signup-label">Driver's License Number:
                    <input
                        className="signup-input"
                        type="text"
                        name="driverLicenseNumber"
                        value={formData.driverLicenseNumber}
                        onChange={handleChange}
                        required
                        maxLength="16"
                        title="Please enter a 16-character driver's license number"
                    />
                </label>
                <label className="signup-label">Upload Aadhaar Card (JPG, under 2 MB):
                    <input className="signup-file-input" type="file" name="adharCardImage" accept=".jpg,.jpeg" onChange={handleFileChange} required />
                    {errors.adharCardImage && <p className="error-text">{errors.adharCardImage}</p>}
                </label>
                <label className="signup-label">Upload Driver's License (JPG, under 2 MB):
                    <input className="signup-file-input" type="file" name="driverLicenseImage" accept=".jpg,.jpeg" onChange={handleFileChange} required />
                    {errors.driverLicenseImage && <p className="error-text">{errors.driverLicenseImage}</p>}
                </label>
                <button className="signup-button" type="submit">Submit Application</button>
            </form>
        </div>
    );
};

export default Signup;
