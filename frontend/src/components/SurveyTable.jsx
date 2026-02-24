import { useState, useMemo } from "react";
import {
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { deleteSurvey } from "../services/api";

const PAGE_SIZE = 10;

const SurveyTable = ({ surveys, onDeleted }) => {
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [occFilter, setOccFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    return surveys.filter((s) => {
      const matchSearch =
        !search || s.name?.toLowerCase().includes(search.toLowerCase());
      const matchGender = !genderFilter || s.gender === genderFilter;
      const matchOcc = !occFilter || s.occupationType === occFilter;
      const matchDuration =
        !durationFilter || s.associationDuration === durationFilter;
      return matchSearch && matchGender && matchOcc && matchDuration;
    });
  }, [surveys, search, genderFilter, occFilter, durationFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteSurvey(deleteTarget._id);
      onDeleted(deleteTarget._id);
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const satisfactionBadge = (val) => {
    if (val === "Highly Satisfied") return "badge-green";
    if (val === "Satisfied") return "badge-blue";
    return "badge-orange";
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="table-toolbar">
        <div className="search-wrapper">
          <Search size={15} className="search-icon" />
          <input
            className="search-input"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <select
          className="filter-select"
          value={genderFilter}
          onChange={(e) => {
            setGenderFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Genders</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <select
          className="filter-select"
          value={occFilter}
          onChange={(e) => {
            setOccFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Occupations</option>
          <option>Kirana Store</option>
          <option>Supermarket</option>
          <option>Wholesaler</option>
          <option>General Merchant</option>
        </select>
        <select
          className="filter-select"
          value={durationFilter}
          onChange={(e) => {
            setDurationFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Durations</option>
          <option>0-6 Months</option>
          <option>6-12 Months</option>
          <option>More than 1 Year</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        {paginated.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Search size={22} />
            </div>
            <h4>No results found</h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Occupation</th>
                <th>Order Method</th>
                <th>Association</th>
                <th>Overall Satisfaction</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((s, i) => (
                <tr key={s._id}>
                  <td style={{ color: "var(--text-muted)" }}>
                    {(page - 1) * PAGE_SIZE + i + 1}
                  </td>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td>
                    <span
                      className={`badge ${s.gender === "Male" ? "badge-blue" : "badge-orange"}`}
                    >
                      {s.gender}
                    </span>
                  </td>
                  <td>{s.occupationType}</td>
                  <td>{s.orderMethod}</td>
                  <td>{s.associationDuration}</td>
                  <td>
                    <span
                      className={`badge ${satisfactionBadge(s.overallSatisfaction)}`}
                    >
                      {s.overallSatisfaction}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => setDeleteTarget(s)}
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <p className="pagination-info">
          Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–
          {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}{" "}
          results
        </p>
        <div className="pagination-controls">
          <button
            className="page-btn"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                className={`page-btn ${page === p ? "active" : ""}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            );
          })}
          <button
            className="page-btn"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages || totalPages === 0}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {deleteTarget && (
        <div className="modal-backdrop">
          <div className="modal">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  background: "var(--danger-light)",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <AlertTriangle size={20} color="var(--danger)" />
              </div>
              <h3>Delete Survey?</h3>
            </div>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget.name}</strong>'s survey? This action cannot
              be undone.
            </p>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyTable;
