"use client";

import { useState } from "react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { certificates, activities, CertificateItem } from "@/data/portfolio";

export function Certificates() {
  const [filter, setFilter] = useState<"all" | "physical" | "professional">("all");
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(null);

  const filteredCertificates = certificates.filter((cert) => {
    if (filter === "physical") return cert.hasPhysicalDocument;
    if (filter === "professional") return cert.category === "Professional";
    return true;
  });

  const physicalCount = certificates.filter((c) => c.hasPhysicalDocument).length;
  const professionalCount = certificates.filter((c) => c.category === "Professional").length;

  return (
    <section id="certificates" className="border-b border-slate-200/80 bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <BlurFade inView>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200/80 bg-sky-50/80 px-2.5 py-0.5 text-xs font-medium text-sky-800">
                <Icon name="award" size={13} className="text-sky-600" />
                <span>Verified Credentials & Licenses</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Certifications & Accreditations
              </h2>
              <p className="mt-2 text-sm text-slate-600 sm:text-base leading-relaxed">
                Dokumentasi resmi pelatihan industri Akebono, pengujian TOEIC® ETS, kompetisi teknologi PNJ, dan lisensi profesi kompetensi nasional (BNSP & LSP).
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/80 p-1 text-xs">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                  filter === "all"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Semua ({certificates.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("physical")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-all ${
                  filter === "physical"
                    ? "bg-sky-600 text-white shadow-2xs font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon name="eye" size={12} className={filter === "physical" ? "text-white" : "text-sky-600"} />
                <span>Dokumen Fisik ({physicalCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setFilter("professional")}
                className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                  filter === "professional"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Lisensi Profesi ({professionalCount})
              </button>
            </div>
          </div>
        </BlurFade>

        {/* Certificates Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCertificates.map((cert, idx) => {
            const hasImage = Boolean(cert.imageUrl);

            return (
              <BlurFade key={cert.id} delay={0.08 + idx * 0.04} inView>
                <div
                  className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 ${
                    hasImage
                      ? "border-slate-200 bg-white hover:border-sky-300 hover:shadow-md cursor-pointer"
                      : "border-slate-200/90 bg-gradient-to-b from-slate-50/50 to-white hover:border-slate-300 hover:shadow-xs"
                  }`}
                  onClick={() => {
                    if (hasImage) {
                      setActiveCert(cert);
                    }
                  }}
                  role={hasImage ? "button" : undefined}
                  tabIndex={hasImage ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (hasImage && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      setActiveCert(cert);
                    }
                  }}
                >
                  {/* Top Image Preview for Physical Certificates */}
                  {hasImage && cert.imageUrl ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                      <Image
                        src={cert.imageUrl}
                        alt={`Sertifikat ${cert.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Image Gradient Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3.5">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur-xs">
                          <Icon name="eye" size={13} className="text-sky-600" />
                          <span>Klik untuk Memperbesar</span>
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10.5px] font-semibold text-slate-800 shadow-xs backdrop-blur-xs">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Dokumen Terverifikasi
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Badge Header for Non-Image Certificates (BNSP/LSP) */
                    <div className="border-b border-slate-100 bg-slate-50/60 p-4 pb-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                        <Icon name="award" size={14} className="text-sky-600" />
                        <span>Lisensi Standar Nasional (SKKNI)</span>
                      </span>
                      <span className="rounded-full bg-slate-200/70 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-600">
                        {cert.year}
                      </span>
                    </div>
                  )}

                  {/* Card Content Body */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      {/* Category & Date Line */}
                      <div className="flex items-center justify-between gap-2">
                        <Badge
                          variant={
                            cert.category === "Professional"
                              ? "accent"
                              : cert.category === "Language"
                              ? "muted"
                              : "default"
                          }
                          className="text-[11px]"
                        >
                          {cert.category}
                        </Badge>
                        <span className="font-mono text-xs text-slate-400">
                          {cert.date || cert.year}
                        </span>
                      </div>

                      {/* Certificate Title */}
                      <h3 className="mt-3 text-base font-bold text-slate-900 leading-snug group-hover:text-sky-700 transition-colors">
                        {cert.title}
                      </h3>

                      {/* Issuer with Logo */}
                      <div className="mt-2.5 flex items-center gap-2 text-xs font-medium text-slate-600">
                        {cert.logoUrl ? (
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-slate-200 bg-white p-0.5">
                            <Image
                              src={cert.logoUrl}
                              alt={`${cert.issuer} Logo`}
                              width={16}
                              height={16}
                              className="h-full w-full object-contain"
                            />
                          </span>
                        ) : (
                          <Icon name="certificate" size={13} className="text-sky-600 shrink-0" />
                        )}
                        <span className="truncate">{cert.issuer}</span>
                      </div>

                      {/* Optional Short Description */}
                      {cert.description && (
                        <p className="mt-2.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {cert.description}
                        </p>
                      )}

                      {/* TOEIC Score Pill or Skill Tags */}
                      {cert.scoreBreakdown && (
                        <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-sky-50 border border-sky-100 px-2.5 py-1 text-xs text-sky-900 font-mono">
                          <span className="font-bold">Skor TOEIC: 830</span>
                          <span className="text-sky-500">•</span>
                          <span className="text-sky-700 text-[11px]">L: 380 / R: 450</span>
                        </div>
                      )}

                      {cert.skills && !cert.scoreBreakdown && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {cert.skills.slice(0, 2).map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex rounded-md bg-slate-100/80 px-2 py-0.5 text-[10.5px] font-medium text-slate-600"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Footer / Credential ID */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      {cert.credentialId ? (
                        <span className="font-mono text-[10.5px] text-slate-400 truncate max-w-[190px]" title={cert.credentialId}>
                          {cert.credentialId}
                        </span>
                      ) : (
                        <span className="font-mono text-[10.5px] text-slate-400">
                          Verified Participant
                        </span>
                      )}

                      {hasImage ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 group-hover:text-sky-700 group-hover:translate-x-0.5 transition-transform">
                          <span>Buka</span>
                          <Icon name="arrow-right" size={11} />
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium text-[11px]">
                          Official License
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </BlurFade>
            );
          })}
        </div>

        {/* Modal Lightbox for Full-Resolution Certificate View */}
        <Dialog open={Boolean(activeCert)} onOpenChange={(open) => !open && setActiveCert(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white sm:rounded-2xl border border-slate-200 shadow-2xl">
            {activeCert && (
              <div className="flex flex-col max-h-[90vh]">
                {/* Modal Header */}
                <div className="border-b border-slate-100 bg-slate-50/70 p-4 sm:p-5 pr-12">
                  <DialogHeader className="text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant={
                          activeCert.category === "Professional"
                            ? "accent"
                            : activeCert.category === "Language"
                            ? "muted"
                            : "default"
                        }
                        className="text-[11px]"
                      >
                        {activeCert.category}
                      </Badge>
                      <span className="font-mono text-xs text-slate-500">
                        {activeCert.date || activeCert.year}
                      </span>
                    </div>
                    <DialogTitle className="mt-1.5 text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      {activeCert.title}
                    </DialogTitle>
                    <div className="mt-1 flex items-center gap-2 text-xs font-medium text-slate-600">
                      {activeCert.logoUrl && (
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-slate-200 bg-white p-0.5">
                          <Image
                            src={activeCert.logoUrl}
                            alt={`${activeCert.issuer} Logo`}
                            width={12}
                            height={12}
                            className="h-full w-full object-contain"
                          />
                        </span>
                      )}
                      <span>{activeCert.issuer}</span>
                    </div>
                  </DialogHeader>
                </div>

                {/* Modal Certificate Image Preview */}
                <div className="relative flex-1 overflow-auto bg-slate-900/95 p-3 sm:p-6 flex items-center justify-center min-h-[320px] max-h-[58vh]">
                  {activeCert.imageUrl ? (
                    <div className="relative max-h-[54vh] w-full flex items-center justify-center">
                      <Image
                        src={activeCert.imageUrl}
                        alt={activeCert.title}
                        width={1200}
                        height={850}
                        priority
                        className="max-h-[54vh] w-auto rounded-lg object-contain shadow-2xl ring-1 ring-white/10"
                      />
                    </div>
                  ) : (
                    <div className="p-10 text-center text-slate-400">
                      Dokumen foto belum tersedia.
                    </div>
                  )}
                </div>

                {/* Modal Metadata Drawer */}
                <div className="border-t border-slate-200 bg-white p-4 sm:p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-mono uppercase text-[10.5px] font-bold tracking-wider text-slate-400">
                        Nomor Kredensial / Sertifikat
                      </span>
                      <p className="mt-1 font-mono font-semibold text-slate-800 break-all">
                        {activeCert.credentialId || "Terverifikasi Resmi Lembaga"}
                      </p>
                    </div>

                    {activeCert.scoreBreakdown && (
                      <div>
                        <span className="font-mono uppercase text-[10.5px] font-bold tracking-wider text-slate-400">
                          Rincian Nilai TOEIC®
                        </span>
                        <p className="mt-1 font-mono font-semibold text-sky-700">
                          Total: {activeCert.scoreBreakdown.total} / {activeCert.scoreBreakdown.maxScore} (Listening: {activeCert.scoreBreakdown.listening}, Reading: {activeCert.scoreBreakdown.reading})
                        </p>
                      </div>
                    )}

                    {activeCert.signers && activeCert.signers.length > 0 && (
                      <div className="sm:col-span-2">
                        <span className="font-mono uppercase text-[10.5px] font-bold tracking-wider text-slate-400">
                          Pejabat Penandatangan Resmi
                        </span>
                        <div className="mt-1 flex flex-wrap gap-2 text-slate-700">
                          {activeCert.signers.map((signer) => (
                            <span
                              key={signer}
                              className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium"
                            >
                              {signer}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeCert.description && (
                      <div className="sm:col-span-2">
                        <span className="font-mono uppercase text-[10.5px] font-bold tracking-wider text-slate-400">
                          Deskripsi & Ruang Lingkup Pelatihan
                        </span>
                        <p className="mt-1 text-slate-600 leading-relaxed">
                          {activeCert.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Penerbitan Terverifikasi • Portfolio Tiar Rizky Budiyono
                    </span>
                    {activeCert.imageUrl && (
                      <a
                        href={activeCert.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-sky-700 transition-colors"
                      >
                        <Icon name="external-link" size={12} />
                        <span>Buka Gambar Asli</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Technical Committees & Organization */}
        <div className="mt-16 pt-10 border-t border-slate-200/80">
          <BlurFade inView>
            <div className="max-w-2xl">
              <h3 className="text-lg font-bold text-slate-900">
                Co-Curricular & Organization Service
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Aktivitas kepanitiaan teknik elektro, koordinasi divisi Media Kreatif tingkat nasional, dan pengabdian masyarakat.
              </p>
            </div>
          </BlurFade>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {activities.map((act, idx) => (
              <BlurFade key={act.id} delay={0.12 + idx * 0.04} inView>
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4.5 transition-all hover:bg-white hover:shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-sky-700 font-semibold">
                      {act.role}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {act.year}
                    </span>
                  </div>
                  <h4 className="mt-1.5 font-bold text-slate-900 text-sm">
                    {act.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {act.description}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
