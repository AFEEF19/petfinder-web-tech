import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();


    // ================================
    // PetFinder State
    // ================================

    const [formData, setFormData] = useState({
        pet_name: "",
        pet_type: "",
        breed: "",
        color: "",
        location: "",
        description: "",
        report_type: "Lost",
        contact: "",
        image: "",
    });

    const [pets, setPets] = useState([]);

    const [search, setSearch] = useState("");

    const [reportFilter, setReportFilter] = useState("All");

    const [user, setUser] = useState(null);


    // ================================
    // Fetch Logged-in User
    // ================================

    useEffect(() => {

        fetch("http://localhost:5000/api/session", {
            credentials: "include",
        })

            .then((response) => {

                if (!response.ok) {
                    throw new Error("Not authenticated");
                }

                return response.json();

            })

            .then((data) => {

                setUser(data.user);

            })

            .catch(() => {

                navigate("/login");

            });

    }, [navigate]);


    // ================================
    // Fetch Pet Reports
    // ================================

    useEffect(() => {

        fetch("http://localhost:5000/api/pets", {
            credentials: "include",
        })

            .then((response) => response.json())

            .then((data) => {

                setPets(data);

            })

            .catch((error) => {

                console.error(
                    "Error fetching pets:",
                    error
                );

            });

    }, []);


    // ================================
    // Logout
    // ================================

    const handleLogout = async () => {

        try {

            await fetch(
                "http://localhost:5000/api/logout",
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            setUser(null);

            navigate("/login");

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

            navigate("/login");

        }

    };


    // ================================
    // Handle Pet Form
    // ================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

    };


    // ================================
    // Submit Pet Report
    // ================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = new FormData();

            data.append(
                "pet_name",
                formData.pet_name
            );

            data.append(
                "pet_type",
                formData.pet_type
            );

            data.append(
                "breed",
                formData.breed
            );

            data.append(
                "color",
                formData.color
            );

            data.append(
                "location",
                formData.location
            );

            data.append(
                "description",
                formData.description
            );

            data.append(
                "report_type",
                formData.report_type
            );

            data.append(
                "contact",
                formData.contact
            );


            if (formData.image) {

                data.append(
                    "image",
                    formData.image
                );

            }


            const response = await fetch(
                "http://localhost:5000/api/pets",
                {
                    method: "POST",
                    credentials: "include",
                    body: data,
                }
            );


            const result = await response.json();


            if (response.ok) {

                alert(
                    "Pet report submitted successfully! 🐾"
                );


                setFormData({
                    pet_name: "",
                    pet_type: "",
                    breed: "",
                    color: "",
                    location: "",
                    description: "",
                    report_type: "Lost",
                    contact: "",
                    image: "",
                });


                fetch(
                    "http://localhost:5000/api/pets",
                    {
                        credentials: "include",
                    }
                )

                    .then((response) =>
                        response.json()
                    )

                    .then((data) => {

                        setPets(data);

                    });

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.error(
                "Error:",
                error
            );

            alert(
                "Could not connect to the server."
            );

        }

    };


    // ================================
    // Search and Filter
    // ================================

    const filteredPets = pets.filter((pet) => {

        const searchText =
            search.toLowerCase();


        const matchesSearch =
            (pet.pet_name || "")
                .toLowerCase()
                .includes(searchText)

            ||

            (pet.location || "")
                .toLowerCase()
                .includes(searchText)

            ||

            (pet.breed || "")
                .toLowerCase()
                .includes(searchText)

            ||

            (pet.pet_type || "")
                .toLowerCase()
                .includes(searchText);


        const matchesReportType =
            reportFilter === "All" ||
            pet.report_type === reportFilter;


        return (
            matchesSearch &&
            matchesReportType
        );

    });


    // ================================
    // Page
    // ================================

    return (

        <div>

            {/* ================================
                      HOME HEADER
                ================================ */}

            <div className="home-header">

                <h1>
                    🐾 PetFinder Mini
                </h1>


                <div className="user-section">

                    <span>
                        Welcome, {user?.name}
                    </span>


                    <button
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>


            {/* ==========================
                      REPORT FORM
                ========================== */}

            <h2>
                Report a Pet
            </h2>


            <form
                onSubmit={handleSubmit}
                className="pet-form"
            >

                <div className="form-group">

                    <label>
                        Report Type
                    </label>


                    <select
                        name="report_type"
                        value={formData.report_type}
                        onChange={handleChange}
                    >

                        <option value="Lost">
                            Lost
                        </option>

                        <option value="Found">
                            Found
                        </option>

                    </select>

                </div>


                <div className="form-group">

                    <label>
                        Pet Name
                    </label>


                    <input
                        type="text"
                        name="pet_name"
                        value={formData.pet_name}
                        onChange={handleChange}
                        placeholder="Pet name"
                    />

                </div>


                <div className="form-group">

                    <label>
                        Pet Type
                    </label>


                    <input
                        type="text"
                        name="pet_type"
                        value={formData.pet_type}
                        onChange={handleChange}
                        placeholder="Dog / Cat"
                    />

                </div>


                <div className="form-group">

                    <label>
                        Breed
                    </label>


                    <input
                        type="text"
                        name="breed"
                        value={formData.breed}
                        onChange={handleChange}
                        placeholder="Breed"
                    />

                </div>


                <div className="form-group">

                    <label>
                        Color
                    </label>


                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        placeholder="Color"
                    />

                </div>


                <div className="form-group">

                    <label>
                        Location
                    </label>


                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Where was the pet lost/found?"
                    />

                </div>


                <div className="form-group">

                    <label>
                        Description
                    </label>


                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the pet..."
                    />

                </div>


                <div className="form-group">

                    <label>
                        Contact
                    </label>


                    <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="Phone number"
                    />

                </div>


                <div className="form-group">

                    <label>
                        Pet Image
                    </label>


                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                image:
                                    e.target.files[0],
                            })
                        }
                    />

                </div>


                <button type="submit">
                    Submit Report
                </button>

            </form>


            <hr />


            {/* ==========================
                      PET REPORTS
                ========================== */}

            <h2>
                Pet Reports
            </h2>


            <div className="search-controls">

                <input
                    type="text"
                    placeholder="Search by location, breed, or pet type..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />


                <select
                    value={reportFilter}
                    onChange={(e) =>
                        setReportFilter(
                            e.target.value
                        )
                    }
                >

                    <option value="All">
                        All Reports
                    </option>

                    <option value="Lost">
                        Lost Pets
                    </option>

                    <option value="Found">
                        Found Pets
                    </option>

                </select>

            </div>


            {/* ==========================
                    NO RESULTS / PET CARDS
                ========================== */}

            {filteredPets.length === 0 ? (

                <p className="no-results">
                    No pet reports found.
                </p>

            ) : (

                filteredPets.map((pet) => (

                    <div
                        className="pet-card"
                        key={pet.id}
                    >

                        {pet.image && (

                            <img
                                src={
                                    `http://localhost:5000${pet.image}`
                                }
                                alt={
                                    pet.pet_name ||
                                    "Pet"
                                }
                                className="pet-image"
                            />

                        )}


                        <div className="pet-card-content">

                            <span
                                className={
                                    `report-badge ${pet.report_type.toLowerCase()}`
                                }
                            >
                                {pet.report_type}
                            </span>


                            <h3>
                                {
                                    pet.pet_name ||
                                    "Unknown Name"
                                }
                            </h3>


                            <p>
                                <strong>
                                    Type:
                                </strong>{" "}
                                {pet.pet_type}
                            </p>


                            <p>
                                <strong>
                                    Breed:
                                </strong>{" "}
                                {pet.breed}
                            </p>


                            <p>
                                <strong>
                                    Color:
                                </strong>{" "}
                                {pet.color}
                            </p>


                            <p>
                                <strong>
                                    Location:
                                </strong>{" "}
                                {pet.location}
                            </p>


                            <p>
                                <strong>
                                    Description:
                                </strong>{" "}
                                {pet.description}
                            </p>


                            <p>
                                <strong>
                                    Contact:
                                </strong>{" "}
                                {pet.contact}
                            </p>

                        </div>

                    </div>

                ))

            )}

        </div>

    );
}

export default Home;