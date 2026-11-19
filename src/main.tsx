import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  FileText,
  LibraryBig,
  LockKeyhole,
  LogOut,
  Search,
  ShieldCheck,
} from "lucide-react";
import "./styles.css";

const books=[
 {title:"Modern Web Engineering",cat:"Development",desc:"Frontend architecture, APIs and production patterns.",tag:"WEB"},
 {title:"Artificial Intelligence",cat:"AI / ML",desc:"Practical concepts for building intelligent systems.",tag:"AI"},
 {title:"Data Structures",cat:"Computer Science",desc:"Algorithms, trees, graphs and complexity made clear.",tag:"DSA"},
 {title:"Robotics Fundamentals",cat:"Robotics",desc:"Sensors, control, embedded systems and autonomous robots.",tag:"ROB"},
 {title:"Python Mastery",cat:"Programming",desc:"From clean Python basics to useful automation.",tag:"PY"},
 {title:"Database Systems",cat:"Backend",desc:"SQL, data modeling and reliable backend design.",tag:"DB"},
];

function App() {
  const [gate, setGate] = useState(true);
  const [token, setToken] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [query, setQuery] = useState("");

  const enter = () => {
    if (token === "LIB-2026" && pass === "yuv12345") {
      setErr("");
      setGate(false);
    } else {
      setErr("Invalid library token or passkey.");
    }
  };

  const filtered = books.filter((book) =>
    (book.title + " " + book.cat + " " + book.desc)
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="app grid-field">
      <AnimatePresence mode="wait">
        {gate ? (
          <motion.main
            key="gate"
            className="gate"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            <motion.section
              className="access-card"
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <header className="brand-row">
                <div className="brand-mark"><LibraryBig size={20} /></div>
                <div>
                  <b>ARCHIVE 01</b>
                  <small>PRIVATE DIGITAL LIBRARY</small>
                </div>
              </header>

              <div className="lock-mark"><LockKeyhole size={27} /></div>
              <div className="eyebrow"><ShieldCheck size={14} /> RESTRICTED ACCESS</div>
              <h1>Enter the library.</h1>
              <p className="sub">A private archive for authorized readers. Present your library credentials to continue.</p>

              <label htmlFor="token">LIBRARY TOKEN</label>
              <div className="input-wrap">
                <input
                  id="token"
                  value={token}
                  onChange={(event) => setToken(event.target.value)}
                  placeholder="LIB-XXXX"
                  onKeyDown={(event) => event.key === "Enter" && enter()}
                />
              </div>

              <label htmlFor="passkey">PASSKEY</label>
              <div className="input-wrap">
                <input
                  id="passkey"
                  type="password"
                  value={pass}
                  onChange={(event) => setPass(event.target.value)}
                  placeholder="Enter passkey"
                  onKeyDown={(event) => event.key === "Enter" && enter()}
                />
              </div>

              {err && <motion.div className="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{err}</motion.div>}
              <button className="verify-button" onClick={enter}>
                VERIFY ACCESS <ArrowRight size={18} />
              </button>
              <div className="hint">Demo credentials: <b>LIB-2026</b> / <b>yuv12345</b></div>
            </motion.section>
            <div className="footer-note">ENCRYPTED SESSION <span /> AUTHORIZED USERS ONLY</div>
          </motion.main>
        ) : (
          <motion.main key="library" className="library" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <header className="library-header">
              <div className="brand-row compact">
                <div className="brand-mark"><LibraryBig size={17} /></div>
                <div><b>ARCHIVE 01</b><small>DIGITAL LIBRARY</small></div>
              </div>
              <div className="search">
                <Search size={16} />
                <input
                  aria-label="Search the archive"
                  placeholder="Search the archive..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <button
                className="logout"
                onClick={() => {
                  setGate(true);
                  setToken("");
                  setPass("");
                }}
              >
                <LogOut size={16} /> Exit
              </button>
            </header>

            <section className="welcome">
              <div>
                <div className="eyebrow"><span className="status-dot" /> ACCESS GRANTED</div>
                <h2>Your knowledge archive.</h2>
                <p>Explore curated resources from your private library.</p>
              </div>
              <div className="stats">
                <div><b>06</b><span>COLLECTIONS</span></div>
                <div><b>24</b><span>RESOURCES</span></div>
              </div>
            </section>

            <div className="section-head">
              <div><span>COLLECTION</span><h3>Featured resources</h3></div>
              <div className="filter">ALL RESOURCES</div>
            </div>

            <div className="books">
              {filtered.map((book, index) => (
                <motion.article
                  key={book.title}
                  className="book"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -5 }}
                >
                  <div className="cover">
                    <span>{book.tag}</span>
                    <BookOpen size={44} strokeWidth={1.25} />
                    <i>ARCHIVE 01</i>
                  </div>
                  <div className="book-body">
                    <div className="meta">{book.cat}</div>
                    <h4>{book.title}</h4>
                    <p>{book.desc}</p>
                    <button className="read">OPEN RESOURCE <ArrowRight size={14} /></button>
                  </div>
                </motion.article>
              ))}
            </div>

            {!filtered.length && (
              <div className="empty"><FileText size={18} /> No resources found.</div>
            )}

            <footer className="library-footer">
              <b>ARCHIVE 01</b>
              <span>PRIVATE KNOWLEDGE SYSTEM</span>
              <span>SECURE SESSION ACTIVE</span>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(<App/>);