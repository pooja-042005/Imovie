require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./models/Movie'); // Adjust path if your model is located elsewhere

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB Atlas connected for seeding ✅");

    try {
      // Clear existing records and re-seed all blockbuster movies
      await Movie.deleteMany({});
      
      const sampleMovies = [
        {
          title: "Interstellar",
          genre: "Sci-Fi / Adventure",
          rating: "8.8",
          poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=500",
          description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
        },
        {
          title: "The Dark Knight",
          genre: "Action / Crime",
          rating: "9.0",
          poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=500",
          description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests."
        },
        {
          title: "Inception",
          genre: "Sci-Fi / Thriller",
          rating: "8.8",
          poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500",
          description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea."
        },
        {
          title: "Avatar: The Way of Water",
          genre: "Sci-Fi / Action",
          rating: "7.6",
          poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=500",
          description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora."
        },
        {
          title: "Oppenheimer",
          genre: "Biography / Drama",
          rating: "8.9",
          poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=500",
          description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb."
        },
        {
          title: "Spider-Man: Across the Spider-Verse",
          genre: "Animation / Action",
          rating: "8.7",
          poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=500",
          description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence."
        },
        {
          title: "John Wick: Chapter 4",
          genre: "Action / Thriller",
          rating: "7.8",
          poster: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=500",
          description: "John Wick uncovers a path to defeating The High Table."
        },
        {
          title: "Dune: Part Two",
          genre: "Sci-Fi / Adventure",
          rating: "8.6",
          poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=500",
          description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family."
        }
      ];

      await Movie.insertMany(sampleMovies);
      console.log("Database successfully seeded with all blockbusters! 🚀");
    } catch (err) {
      console.log("Seeding error:", err);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch(err => console.log("Connection error:", err));