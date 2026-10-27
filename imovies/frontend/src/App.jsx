import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
axios.defaults.baseURL = API_URL;

// --- HOME PAGE COMPONENT ---
function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    axios.get('/api/movies')
      .then(res => setMovies(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{background: '#141414', minHeight: '100vh', color: '#fff', paddingBottom: '80px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'}}>
      
      {/* Netflix Dynamic Navbar */}
      <nav style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '20px 50px', 
        background: isScrolled ? '#141414' : 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        transition: 'background 0.3s ease'
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: '40px'}}>
          <Link to="/" style={{color: '#E50914', fontSize: '28px', fontWeight: '900', textDecoration: 'none', letterSpacing: '1px'}}>IMOVIES</Link>
          
          {/* Netflix Expandable Animated Search Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: isSearchOpen || searchQuery ? 'rgba(0,0,0,0.85)' : 'transparent',
            border: isSearchOpen || searchQuery ? '1px solid rgba(255,255,255,0.8)' : '1px solid transparent',
            borderRadius: '4px',
            padding: '6px 12px',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
          }}>
            <span 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              style={{cursor: 'pointer', fontSize: '16px', color: '#fff', marginRight: searchQuery || isSearchOpen ? '8px' : '0'}}
            >
              🔍
            </span>
            <input 
              type="text" 
              placeholder="Titles, genres..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              style={{
                background: 'transparent', 
                border: 'none', 
                color: '#fff', 
                fontSize: '14px', 
                width: isSearchOpen || searchQuery ? '220px' : '0px', 
                opacity: isSearchOpen || searchQuery ? '1' : '0',
                outline: 'none',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
              }}
            />
          </div>
        </div>

        <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
          {user && user.role === 'admin' && (
            <Link to="/admin" style={{color: '#e5e5e5', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s'}} onMouseEnter={e => e.target.style.color='#fff'} onMouseLeave={e => e.target.style.color='#e5e5e5'}>Admin Panel</Link>
          )}

          {user ? (
            <>
              <Link to="/my-bookings" style={{color: '#e5e5e5', textDecoration: 'none', fontSize: '14px', fontWeight: '500'}} onMouseEnter={e => e.target.style.color='#fff'} onMouseLeave={e => e.target.style.color='#e5e5e5'}>My Bookings</Link>
              <span style={{color: '#fff', fontWeight: '600', fontSize: '14px', background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '4px', backdropFilter: 'blur(4px)'}}>👤 {user.name || user.email}</span>
              <button onClick={handleLogout} style={{background: '#E50914', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', transition: 'background 0.2s'}} onMouseEnter={e => e.target.style.background='#f40612'} onMouseLeave={e => e.target.style.background='#E50914'}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px'}}>Sign In</Link>
              <Link to="/register" style={{background: '#E50914', color: '#fff', padding: '8px 20px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', transition: 'background 0.2s'}} onMouseEnter={e => e.target.style.background='#f40612'} onMouseLeave={e => e.target.style.background='#E50914'}>Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Banner */}
      <div style={{
        height: '520px', 
        backgroundImage: 'linear-gradient(to top, #141414, rgba(20,20,20,0.3), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1600")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        padding: '0 50px',
        position: 'relative'
      }}>
        <div style={{maxWidth: '650px', marginTop: '80px'}}>
          <span style={{background: '#E50914', color: '#fff', padding: '4px 10px', fontSize: '12px', fontWeight: 'bold', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '1px'}}>Trending Now</span>
          <h1 style={{fontSize: '52px', fontWeight: '800', margin: '12px 0 16px 0', lineHeight: '1.1'}}>Unlimited Blockbusters, Shows, & More</h1>
          <p style={{fontSize: '18px', color: '#d2d2d2', marginBottom: '24px', lineHeight: '1.5'}}>Experience cinema booking reimagined with lightning-fast seat selection and instant confirmations.</p>
        </div>
      </div>

      {/* Movie Grid Section */}
      <div style={{padding: '30px 50px'}}>
        <h2 style={{color: '#fff', marginBottom: '24px', fontSize: '24px', fontWeight: '700'}}>Trending Blockbusters</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '28px'}}>
          {filteredMovies.map((movie) => (
            <Link 
              to={`/movie/${movie._id}`} 
              key={movie._id} 
              style={{
                textDecoration: 'none', 
                color: '#fff', 
                background: '#181818', 
                borderRadius: '6px', 
                overflow: 'hidden', 
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.7)';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.4)';
              }}
            >
              <div style={{position: 'relative'}}>
                <img src={movie.poster} alt={movie.title} style={{width: '100%', height: '310px', objectFit: 'cover'}} />
                <div style={{position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', color: '#46d369'}}>
                  ★ {movie.rating}
                </div>
              </div>
              <div style={{padding: '16px'}}>
                <div style={{fontSize: '17px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '6px'}}>{movie.title}</div>
                <div style={{fontSize: '13px', color: '#aaa'}}>{movie.genre}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- ADMIN DASHBOARD COMPONENT ---
function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({ title: '', genre: '', rating: '', poster: '', description: '' });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      alert("Access Denied! Admins only.");
      navigate('/');
      return;
    }
    fetchMovies();
  }, [user, navigate]);

  const fetchMovies = () => {
    axios.get('/api/movies')
      .then(res => setMovies(res.data))
      .catch(err => console.log(err));
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/movies', form);
      alert("Movie added successfully! 🎬");
      setForm({ title: '', genre: '', rating: '', poster: '', description: '' });
      fetchMovies();
    } catch (err) {
      alert("Error adding movie: " + err.message);
    }
  };

  const handleDeleteMovie = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await axios.delete(`/api/movies/${id}`);
        alert("Movie deleted successfully! 🗑️");
        fetchMovies();
      } catch (err) {
        alert("Error deleting movie");
      }
    }
  };

  return (
    <div style={{padding: '50px', color: '#fff', maxWidth: '1000px', margin: '0 auto', background: '#141414', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'}}>
      <Link to="/" style={{color: '#E50914', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px'}}>← Back to Home</Link>
      <h2 style={{marginTop: '20px', marginBottom: '30px', fontSize: '28px'}}>Admin Movie Management Panel</h2>

      <form onSubmit={handleAddMovie} style={{background: '#1f1f1f', padding: '30px', borderRadius: '8px', marginBottom: '40px', border: '1px solid #333', boxShadow: '0 8px 25px rgba(0,0,0,0.5)'}}>
        <h3 style={{marginBottom: '20px'}}>Add New Blockbuster</h3>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px'}}>
          <input type="text" placeholder="Movie Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required style={{padding: '12px', background: '#2b2b2b', border: 'none', color: '#fff', borderRadius: '4px', outline: 'none'}} />
          <input type="text" placeholder="Genre (e.g. Action / Sci-Fi)" value={form.genre} onChange={e => setForm({...form, genre: e.target.value})} required style={{padding: '12px', background: '#2b2b2b', border: 'none', color: '#fff', borderRadius: '4px', outline: 'none'}} />
          <input type="text" placeholder="Rating (e.g. 8.8)" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} required style={{padding: '12px', background: '#2b2b2b', border: 'none', color: '#fff', borderRadius: '4px', outline: 'none'}} />
          <input type="text" placeholder="Poster Image URL" value={form.poster} onChange={e => setForm({...form, poster: e.target.value})} required style={{padding: '12px', background: '#2b2b2b', border: 'none', color: '#fff', borderRadius: '4px', outline: 'none'}} />
        </div>
        <textarea placeholder="Movie Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required rows="3" style={{width: '100%', padding: '12px', background: '#2b2b2b', border: 'none', color: '#fff', borderRadius: '4px', marginBottom: '20px', outline: 'none'}} />
        <button type="submit" style={{background: '#E50914', color: '#fff', border: 'none', padding: '12px 25px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.2s'}} onMouseEnter={e => e.target.style.background='#f40612'} onMouseLeave={e => e.target.style.background='#E50914'}>Add Movie</button>
      </form>

      <h3>Manage Existing Movies</h3>
      <div style={{marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
        {movies.map(movie => (
          <div key={movie._id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1f1f1f', padding: '15px 20px', borderRadius: '6px', border: '1px solid #333'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <img src={movie.poster} alt={movie.title} style={{width: '45px', height: '65px', objectFit: 'cover', borderRadius: '4px'}} />
              <div>
                <h4 style={{fontSize: '16px', margin: '0 0 4px 0'}}>{movie.title}</h4>
                <p style={{fontSize: '13px', color: '#aaa', margin: '0'}}>{movie.genre} | ★ {movie.rating}</p>
              </div>
            </div>
            <button onClick={() => handleDeleteMovie(movie._id)} style={{background: '#E50914', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.2s'}} onMouseEnter={e => e.target.style.background='#f40612'} onMouseLeave={e => e.target.style.background='#E50914'}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- MOVIE DETAILS & BOOKING FLOW COMPONENT ---
function MovieBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedTheatre, setSelectedTheatre] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);

  const theatres = [
    { name: "PVR Cinemas: Grand Mall", timings: ["10:00 AM", "01:30 PM", "06:00 PM", "09:30 PM"] },
    { name: "Cinepolis: Metroplex", timings: ["11:15 AM", "03:00 PM", "07:15 PM", "10:45 PM"] },
    { name: "IMAX Laser Screen", timings: ["12:00 PM", "04:00 PM", "08:00 PM"] }
  ];

  const allSeats = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4"];

  useEffect(() => {
    axios.get('/api/movies')
      .then(res => {
        const found = res.data.find(m => m._id === id);
        setMovie(found);
      })
      .catch(err => console.log(err));
  }, [id]);

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert("Please login first to book tickets!");
      navigate('/login');
      return;
    }

    if (!selectedTheatre || !selectedTime || selectedSeats.length === 0) {
      alert("Please select a Theatre, Show Time, and at least one Seat!");
      return;
    }

    try {
      const bookingData = {
        userEmail: user.email,
        movieTitle: movie.title,
        showTime: `${selectedTheatre} - ${selectedTime}`,
        selectedSeats,
        totalAmount: selectedSeats.length * 250
      };

      await axios.post('/api/bookings/book', bookingData);
      alert("Ticket booked successfully! 🎉");
      navigate('/my-bookings');
    } catch (err) {
      alert("Booking failed: " + (err.response?.data?.message || err.message));
    }
  };

  if (!movie) return <div style={{color: '#fff', textAlign: 'center', marginTop: '100px', background: '#141414', minHeight: '100vh'}}>Loading movie details...</div>;

  return (
    <div style={{padding: '50px', color: '#fff', maxWidth: '1000px', margin: '0 auto', background: '#141414', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'}}>
      <Link to="/" style={{color: '#E50914', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px'}}>← Back to Home</Link>
      
      <div style={{display: 'flex', gap: '40px', marginTop: '30px', flexWrap: 'wrap'}}>
        <img src={movie.poster} alt={movie.title} style={{width: '280px', height: '400px', borderRadius: '8px', objectFit: 'cover', boxShadow: '0 8px 25px rgba(0,0,0,0.6)'}} />
        <div style={{flex: 1}}>
          <h1 style={{fontSize: '40px', marginBottom: '12px'}}>{movie.title}</h1>
          <p style={{color: '#aaa', fontSize: '16px', marginBottom: '12px'}}>Genre: {movie.genre}</p>
          <p style={{color: '#46d369', fontWeight: 'bold', fontSize: '16px', marginBottom: '20px'}}>Rating: ★ {movie.rating}</p>
          <p style={{lineHeight: '1.7', color: '#d2d2d2', fontSize: '15px'}}>{movie.description}</p>
        </div>
      </div>

      <div style={{marginTop: '50px'}}>
        <h3 style={{fontSize: '20px', marginBottom: '15px'}}>1. Select Theatre & Timing</h3>
        {theatres.map((t, idx) => (
          <div key={idx} style={{background: '#1f1f1f', padding: '20px', borderRadius: '8px', margin: '12px 0', border: '1px solid #333'}}>
            <h4 style={{marginBottom: '12px', fontSize: '16px'}}>{t.name}</h4>
            <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
              {t.timings.map((time, tIdx) => (
                <button 
                  key={tIdx} 
                  onClick={() => { setSelectedTheatre(t.name); setSelectedTime(time); }}
                  style={{
                    background: selectedTheatre === t.name && selectedTime === time ? '#E50914' : '#2b2b2b',
                    color: '#fff', border: selectedTheatre === t.name && selectedTime === time ? '1px solid #E50914' : '1px solid #444', padding: '10px 18px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s'
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedTheatre && (
        <div style={{marginTop: '50px'}}>
          <h3 style={{fontSize: '20px', marginBottom: '15px'}}>2. Select Seats (₹250 per seat)</h3>
          <div style={{background: '#0a0a0a', padding: '30px', borderRadius: '12px', textAlign: 'center', maxWidth: '450px', margin: '20px auto', border: '1px solid #333'}}>
            <div style={{background: '#222', padding: '8px', marginBottom: '30px', borderRadius: '4px', fontSize: '12px', letterSpacing: '3px', color: '#888'}}>SCREEN THIS WAY</div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px'}}>
              {allSeats.map(seat => (
                <button 
                  key={seat}
                  onClick={() => toggleSeat(seat)}
                  style={{
                    background: selectedSeats.includes(seat) ? '#E50914' : '#1f1f1f',
                    color: '#fff', border: selectedSeats.includes(seat) ? 'none' : '1px solid #444', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s'
                  }}
                >
                  {seat}
                </button>
              ))}
            </div>
          </div>

          <div style={{textAlign: 'center', marginTop: '30px'}}>
            <p style={{fontSize: '15px', color: '#ccc'}}>Selected Seats: <strong style={{color: '#fff'}}>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</strong></p>
            <p style={{fontSize: '20px', fontWeight: 'bold', margin: '12px 0'}}>Total Amount: <span style={{color: '#46d369'}}>₹{selectedSeats.length * 250}</span></p>
            <button 
              onClick={handleBooking}
              style={{background: '#E50914', color: '#fff', border: 'none', padding: '14px 35px', fontSize: '16px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(229,9,20,0.4)', transition: 'background 0.2s'}}
              onMouseEnter={e => e.target.style.background='#f40612'}
              onMouseLeave={e => e.target.style.background='#E50914'}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- MY BOOKINGS COMPONENT ---
function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user && user.email) {
      axios.get(`/api/bookings/user/${user.email}`)
        .then(res => setBookings(res.data))
        .catch(err => console.log(err));
    }
  }, [user]);

  return (
    <div style={{padding: '50px', color: '#fff', maxWidth: '850px', margin: '0 auto', background: '#141414', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'}}>
      <Link to="/" style={{color: '#E50914', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px'}}>← Back to Home</Link>
      <h2 style={{marginTop: '25px', marginBottom: '25px', fontSize: '26px'}}>My Ticket Bookings</h2>
      
      {bookings.length === 0 ? (
        <p style={{color: '#8c8c8c'}}>No bookings found. Book a movie now!</p>
      ) : (
        bookings.map((b, idx) => (
          <div key={idx} style={{background: '#1f1f1f', padding: '24px', borderRadius: '8px', marginBottom: '20px', borderLeft: '4px solid #E50914', boxShadow: '0 4px 15px rgba(0,0,0,0.3)'}}>
            <h3 style={{fontSize: '22px', marginBottom: '10px'}}>{b.movieTitle}</h3>
            <p style={{color: '#bbb', margin: '6px 0'}}>Theatre & Show: <strong style={{color: '#fff'}}>{b.showTime}</strong></p>
            <p style={{color: '#bbb', margin: '6px 0'}}>Seats: <strong style={{color: '#fff'}}>{b.selectedSeats.join(', ')}</strong></p>
            <p style={{color: '#46d369', fontWeight: 'bold', margin: '6px 0', fontSize: '16px'}}>Total Paid: ₹{b.totalAmount}</p>
            <p style={{fontSize: '12px', color: '#777', marginTop: '12px'}}>Booked on: {new Date(b.bookingDate).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

// --- ANIMATED LOGIN COMPONENT ---
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert("Login successful! 🎉");
      navigate('/');
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1600")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <form onSubmit={handleLogin} style={{
        background: 'rgba(0,0,0,0.85)', 
        padding: '60px 50px', 
        borderRadius: '8px', 
        width: '400px', 
        boxShadow: '0 15px 35px rgba(0,0,0,0.8)',
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.6s ease-in-out'
      }}>
        <h2 style={{marginBottom: '30px', fontSize: '32px', fontWeight: '700'}}>Sign In</h2>
        <input 
          type="email" 
          placeholder="Email address" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required
          style={{width: '100%', padding: '16px', margin: '10px 0 16px 0', background: '#333', border: 'none', color: '#fff', borderRadius: '4px', fontSize: '15px', outline: 'none'}}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required
          style={{width: '100%', padding: '16px', margin: '0 0 24px 0', background: '#333', border: 'none', color: '#fff', borderRadius: '4px', fontSize: '15px', outline: 'none'}}
        />
        <button type="submit" style={{
          width: '100%', 
          padding: '16px', 
          background: '#E50914', 
          color: '#fff', 
          border: 'none', 
          fontWeight: 'bold', 
          borderRadius: '4px', 
          cursor: 'pointer', 
          fontSize: '16px',
          transition: 'background 0.2s'
        }}
        onMouseEnter={e => e.target.style.background='#f40612'}
        onMouseLeave={e => e.target.style.background='#E50914'}
        >Sign In</button>
        <p style={{marginTop: '25px', fontSize: '15px', color: '#888', textAlign: 'center'}}>
          New to IMovies? <Link to="/register" style={{color: '#fff', textDecoration: 'none', fontWeight: '500'}}>Register now</Link>
        </p>
      </form>
    </div>
  );
}

// --- ANIMATED REGISTER COMPONENT ---
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { name, email, password, role });
      alert("Registration successful! Please login. 🎉");
      navigate('/login');
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1600")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <form onSubmit={handleRegister} style={{
        background: 'rgba(0,0,0,0.85)', 
        padding: '60px 50px', 
        borderRadius: '8px', 
        width: '400px', 
        boxShadow: '0 15px 35px rgba(0,0,0,0.8)',
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.6s ease-in-out'
      }}>
        <h2 style={{marginBottom: '30px', fontSize: '32px', fontWeight: '700'}}>Register</h2>
        <input 
          type="text" 
          placeholder="Full Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required
          style={{width: '100%', padding: '16px', margin: '10px 0 16px 0', background: '#333', border: 'none', color: '#fff', borderRadius: '4px', fontSize: '15px', outline: 'none'}}
        />
        <input 
          type="email" 
          placeholder="Email address" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required
          style={{width: '100%', padding: '16px', margin: '0 0 16px 0', background: '#333', border: 'none', color: '#fff', borderRadius: '4px', fontSize: '15px', outline: 'none'}}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required
          style={{width: '100%', padding: '16px', margin: '0 0 16px 0', background: '#333', border: 'none', color: '#fff', borderRadius: '4px', fontSize: '15px', outline: 'none'}}
        />
        <div style={{marginBottom: '24px'}}>
          <label style={{fontSize: '14px', color: '#aaa', display: 'block', marginBottom: '6px'}}>Register as:</label>
          <select 
            value={role} 
            onChange={e => setRole(e.target.value)}
            style={{width: '100%', padding: '14px', background: '#333', border: 'none', color: '#fff', borderRadius: '4px', fontSize: '14px', outline: 'none', cursor: 'pointer'}}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" style={{
          width: '100%', 
          padding: '16px', 
          background: '#E50914', 
          color: '#fff', 
          border: 'none', 
          fontWeight: 'bold', 
          borderRadius: '4px', 
          cursor: 'pointer', 
          fontSize: '16px',
          transition: 'background 0.2s'
        }}
        onMouseEnter={e => e.target.style.background='#f40612'}
        onMouseLeave={e => e.target.style.background='#E50914'}
        >Register</button>
        <p style={{marginTop: '25px', fontSize: '15px', color: '#888', textAlign: 'center'}}>
          Already have an account? <Link to="/login" style={{color: '#fff', textDecoration: 'none', fontWeight: '500'}}>Sign in</Link>
        </p>
      </form>
    </div>
  );
}

// --- MAIN APP ROUTER ---
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieBooking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
