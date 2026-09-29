import {
  getDoctorsDictionary,
  getShellDictionary,
  localizePath,
} from "@/lib/i18n";

const filterClasses = [
  ".filter-cardiology",
  ".filter-pediatrics",
  ".filter-dermatology",
  ".filter-orthopedics",
];

const cardFilterClasses = [
  "filter-cardiology",
  "filter-pediatrics",
  "filter-dermatology",
  "filter-orthopedics",
  "filter-cardiology",
  "filter-pediatrics",
  "filter-dermatology",
  "filter-orthopedics",
];

const cardImages = [
  "/assets/img/health/staff-3.webp",
  "/assets/img/health/staff-7.webp",
  "/assets/img/health/staff-12.webp",
  "/assets/img/health/staff-5.webp",
  "/assets/img/health/staff-10.webp",
  "/assets/img/health/staff-2.webp",
  "/assets/img/health/staff-9.webp",
  "/assets/img/health/staff-6.webp",
];

const compactImages = [
  "/assets/img/health/staff-2.webp",
  "/assets/img/health/staff-7.webp",
  "/assets/img/health/staff-6.webp",
  "/assets/img/health/staff-3.webp",
  "/assets/img/health/staff-9.webp",
  "/assets/img/health/staff-11.webp",
];

export default async function DoctorsPage({ params }) {
  const { lang = "en" } = await params;
  const doctors = getDoctorsDictionary(lang);
  const shell = getShellDictionary(lang);

  return (
    <main className="main">
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 className="heading-title">{doctors.title}</h1>
                <p className="mb-0">{doctors.intro}</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href={localizePath("/", lang)}>{shell.nav.home}</a></li>
              <li className="current">{doctors.breadcrumb}</li>
            </ol>
          </div>
        </nav>
      </div>

      <section id="doctors" className="doctors section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="doctor-directory mb-5">
            <div className="directory-bar p-3 p-md-4 rounded-3">
              <div className="row g-3 align-items-center">
                <div className="col-lg-4">
                  <label htmlFor="doctor-search" className="form-label mb-1">{doctors.searchLabel}</label>
                  <div className="position-relative">
                    <i className="bi bi-search search-icon"></i>
                    <input id="doctor-search" type="text" className="form-control search-input" placeholder={doctors.searchPlaceholder} />
                  </div>
                </div>
                <div className="col-lg-3">
                  <label className="form-label mb-1">{doctors.focusLabel}</label>
                  <select className="form-select">
                    <option value="*">{doctors.filters.allCategories}</option>
                    <option value=".filter-cardiology">{doctors.filters.health}</option>
                    <option value=".filter-pediatrics">{doctors.filters.family}</option>
                    <option value=".filter-dermatology">{doctors.filters.dentalVision}</option>
                    <option value=".filter-orthopedics">{doctors.filters.life}</option>
                  </select>
                </div>
                <div className="col-lg-3">
                  <label className="form-label mb-1">{doctors.meetingLabel}</label>
                  <select className="form-select">
                    {doctors.meetingOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </div>
                <div className="col-lg-2 d-grid">
                  <button className="btn btn-appointment">{doctors.applyFilters}</button>
                </div>
              </div>
            </div>

            <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
              <ul className="directory-filters isotope-filters" data-aos="fade-up" data-aos-delay="200">
                <li data-filter="*" className="filter-active">{doctors.filters.all}</li>
                <li data-filter=".filter-cardiology">{doctors.filters.health}</li>
                <li data-filter=".filter-pediatrics">{doctors.filters.family}</li>
                <li data-filter=".filter-dermatology">{doctors.filters.dentalVision}</li>
                <li data-filter=".filter-orthopedics">{doctors.filters.life}</li>
              </ul>
              <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="300">
                {doctors.gridCards.map((card, index) => (
                  <div className={`col-lg-3 col-md-6 doctor-item isotope-item ${cardFilterClasses[index]}`} key={card.name}>
                    <article className="doctor-card h-100">
                      <figure className="doctor-media">
                        <img src={cardImages[index]} className="img-fluid" alt={card.name} loading="lazy" />
                        {card.tag ? <span className={`tag${card.tag === "New" || card.tag === "Nuevo" || card.tag === "Nouvo" ? " alt" : ""}`}>{card.tag}</span> : null}
                      </figure>
                      <div className="doctor-content">
                        <h3 className="doctor-name">{card.name}</h3>
                        <p className="doctor-title">{card.title}</p>
                        <p className="doctor-desc">{card.desc}</p>
                        <div className="doctor-meta"><span className="badge dept">{card.badge}</span></div>
                        <div className="doctor-actions">
                          <a href={localizePath("/appointment", lang)} className="btn btn-sm btn-appointment">{doctors.actions.appointment}</a>
                          <a href={localizePath("/contact", lang)} className="btn btn-sm btn-soft">{doctors.actions.bio}</a>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="single-profile mt-5">
            <div className="row align-items-center g-4">
              <div className="col-lg-5" data-aos="fade-right" data-aos-delay="150">
                <div className="profile-media">
                  <img src="/assets/img/health/staff-12.webp" className="img-fluid" alt={doctors.featuredProfile.name} />
                  <div className="availability">
                    <i className="bi bi-circle-fill me-1"></i>
                    {" "}{doctors.featuredProfile.availability}
                  </div>
                </div>
              </div>
              <div className="col-lg-7" data-aos="fade-left" data-aos-delay="200">
                <div className="profile-content">
                  <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                    <span className="badge role">{doctors.featuredProfile.role}</span>
                    <span className="badge years">{doctors.featuredProfile.years}</span>
                    <span className="badge cert">{doctors.featuredProfile.cert}</span>
                  </div>
                  <h3 className="name mb-1">{doctors.featuredProfile.name}</h3>
                  <p className="title mb-3">{doctors.featuredProfile.title}</p>
                  <p className="bio mb-3">{doctors.featuredProfile.bio}</p>
                  <ul className="list-unstyled highlights mb-4">
                    {doctors.featuredProfile.highlights.map((item, index) => (
                      <li key={item}>
                        <i className={index === 0 ? "bi bi-mortarboard" : index === 1 ? "bi bi-hospital" : "bi bi-award"}></i>
                        {" "}{item}
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex flex-wrap gap-2">
                    <a href={localizePath("/appointment", lang)} className="btn btn-appointment">
                      <i className="bi bi-calendar2-check me-1"></i>
                      {" "}{doctors.actions.consultation}
                    </a>
                    <a href={localizePath("/contact", lang)} className="btn btn-soft">
                      <i className="bi bi-file-earmark-text me-1"></i>
                      {" "}{doctors.actions.bio}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="compact-view mt-5">
            <div className="row g-3">
              {doctors.compactCards.map((card, index) => (
                <div className="col-6 col-md-4 col-lg-2" data-aos="fade-up" data-aos-delay={100 + index * 50} key={card.name}>
                  <div className="minimal-card text-center">
                    <img src={compactImages[index]} alt={card.name} className="avatar img-fluid" loading="lazy" />
                    <div className="info">
                      <h4 className="mb-0">{card.name}</h4>
                      <small>{card.label}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-tabs mt-5">
            <div className="row g-4">
              <div className="col-lg-4" data-aos="fade-right" data-aos-delay="150">
                <div className="tab-profile-card">
                  <img src="/assets/img/health/staff-4.webp" className="img-fluid rounded-3" alt={doctors.tabProfile.name} loading="lazy" />
                  <div className="pt-3">
                    <h3 className="mb-1">{doctors.tabProfile.name}</h3>
                    <p className="mb-2">{doctors.tabProfile.title}</p>
                    <div className="d-flex gap-2">
                      <span className="badge cert">{doctors.tabProfile.cert}</span>
                      <span className="badge years">{doctors.tabProfile.years}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8" data-aos="fade-left" data-aos-delay="200">
                <ul className="nav nav-pills mb-3" role="tablist">
                  {doctors.tabProfile.tabs.map((tab, index) => (
                    <li className="nav-item" role="presentation" key={tab}>
                      <button className={`nav-link${index === 0 ? " active" : ""}`} data-bs-toggle="pill" data-bs-target={`#health-doctors-3-tab-${index + 1}`} type="button" role="tab" aria-controls={`health-doctors-3-tab-${index + 1}`} aria-selected={index === 0}>
                        {tab}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="health-doctors-3-tab-1" role="tabpanel">
                    <p>{doctors.tabProfile.bio}</p>
                    <ul className="list-unstyled mb-0">
                      {doctors.tabProfile.bioPoints.map((item) => (
                        <li key={item}>
                          <i className="bi bi-check2-circle me-1"></i>
                          {" "}{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="tab-pane fade" id="health-doctors-3-tab-2" role="tabpanel">
                    <div className="schedule-grid">
                      <div className="row g-2">
                        {doctors.tabProfile.schedule.map((slot) => (
                          <div className="col-6" key={slot.day}>
                            <div className="slot">
                              <strong>{slot.day}</strong>
                              <span>{slot.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3">
                      <a href={localizePath("/appointment", lang)} className="btn btn-appointment">
                        <i className="bi bi-calendar-event me-1"></i>
                        {" "}{doctors.actions.reserve}
                      </a>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="health-doctors-3-tab-3" role="tabpanel">
                    <div className="review">
                      <div className="d-flex align-items-center mb-2">
                        <div className="stars text-warning me-2">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-half"></i>
                        </div>
                        <small>{doctors.tabProfile.reviewsLabel}</small>
                      </div>
                      <p className="mb-0">{doctors.tabProfile.reviewsText}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
