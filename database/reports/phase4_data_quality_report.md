\# Project HELIX – Phase 4 Data Quality Report



\## Health Data Quality, SQL and Test-Data Management



\*\*Project:\*\* GenomeBridge Clinical Systems Ltd.  

\*\*Phase:\*\* Phase 4 – Health Data Quality, SQL and Test-Data Management  

\*\*Date:\*\* 14 September 2026  

\*\*Database:\*\* Neon `neondb`  

\*\*Schema:\*\* `helix`  

\*\*PostgreSQL:\*\* 18.6



\---



\## 1. Purpose



This report documents the Phase 4 health-data quality investigation, synthetic test-data setup, SQL validation evidence, and the operational-queue analysis required to identify the SPEC\_UNLINK pattern.



The investigation follows the Phase 4 objective of using data-quality validation to distinguish the underlying workflow problem from the surface turnaround-time (TAT) metric.



\---



\## 2. Database and synthetic-data evidence



A PostgreSQL 18.6 database was established in Neon using database `neondb` and schema `helix`.



The Synthea synthetic patient CSV was imported into:



`helix.synthea\_patients`



The imported dataset contains:



\- Patient records: \*\*108\*\*

\- Unique patient IDs: \*\*108\*\*

\- Duplicate patient IDs: \*\*0\*\*

\- Missing first/last names: \*\*0\*\*

\- Missing birth dates: \*\*0\*\*

\- Future birth dates: \*\*0\*\*



These results were obtained from executed PostgreSQL validation queries against the imported Neon data.



\---



\## 3. SQL validation suite



The reusable SQL validation suite is stored at:



`database/validation/phase4\_validation.sql`



The suite covers Phase 4 data-quality areas including:



\- duplicate patient identifiers

\- missing patient names

\- missing birth dates

\- future birth dates

\- referential integrity

\- orphan ServiceRequest records

\- specimens without patients

\- broken foreign-key relationships



The patient-level checks were executed successfully.



The FHIR projection checks are documented in the validation suite but are \*\*not reported as executed\*\*, because the corresponding FHIR projection tables/data had not been populated in the current Neon database.



\---



\## 4. Operational queue data-quality issues



The operational queue report contains eight documented data-quality issues.



\### DQ-001 – Week 6 TAT stored as text



The Week 6 TAT value is stored as text rather than consistently numeric data.



\*\*Impact:\*\* Week 6 should be excluded only from numeric TAT aggregation unless the value is normalised first.



\*\*Action:\*\* Normalise the TAT field to a numeric data type before automated TAT aggregation.



\### DQ-002 – Week 8 SPEC\_TOTAL is null



Week 8 has a missing SPEC\_TOTAL value.



\*\*Impact:\*\* A SPEC\_UNLINK rate cannot be calculated reliably for Week 8 because the denominator is missing.



\*\*Action:\*\* Exclude Week 8 from the primary SPEC\_UNLINK rate calculation and correct the source record.



\### DQ-003 – Week 8 QA\_VERIFIED = N



Week 8 is not marked as QA verified.



\*\*Impact:\*\* Week 8 should not be treated as primary verified evidence.



\*\*Action:\*\* Resolve the underlying QA status before using the record as validated operational evidence.



\### DQ-004 – Week 9 duplicate row



The Week 9 operational row appears twice.



\*\*Impact:\*\* Counting both rows inflates the numerator and denominator totals and can distort the calculated rate.



\*\*Action:\*\* Deduplicate the Week 9 record before aggregation.



\### DQ-005 – Week 11 DUP\_PAT outlier



Week 11 contains a DUP\_PAT value of 14, an outlier relative to surrounding weeks.



\*\*Impact:\*\* This requires investigation because it may indicate an unusual duplicate-patient event or another data-entry/process problem.



\*\*Action:\*\* Investigate the underlying patient records. Do not automatically exclude Week 11 solely because it is an outlier.



\### DQ-006 – Week 13 pipeline status is TBC



Week 13 has a `PIPELINE\_NOTE` value of `TBC`.



\*\*Impact:\*\* The week's operational status is unresolved, so it should not be used as primary evidence for the clean SPEC\_UNLINK rate.



\*\*Action:\*\* Resolve the pipeline status and revalidate the week's figures.



\### DQ-007 – REF\_INC\_PCT is blank



The operational report does not consistently populate the derived `REF\_INC\_PCT` field.



\*\*Impact:\*\* The percentage should be calculated independently from the underlying referral counts.



\*\*Action:\*\* Calculate the percentage directly from `REF\_INC / REF\_ENTERED` and validate the result.



\### DQ-008 – Non-descriptive column headers



The operational queue uses abbreviated column names that are not self-descriptive.



\*\*Impact:\*\* Misinterpretation is possible when analysts use the dataset without its glossary or data dictionary.



\*\*Action:\*\* Maintain a data dictionary/glossary and use descriptive reporting labels where practical.



\---



\## 5. SPEC\_UNLINK rate methodology



The Phase 4 investigation requires a clean dataset before calculating the primary SPEC\_UNLINK figure.



The documented exclusions are:



1\. Exclude Week 8 because `SPEC\_TOTAL` is null.

2\. Exclude Week 13 because the pipeline status is `TBC`.

3\. Deduplicate the duplicate Week 9 row.

4\. Retain Week 11 despite its DUP\_PAT outlier because an outlier requires investigation rather than automatic exclusion.

5\. Treat the Week 6 TAT text issue as a TAT-specific problem; it does not remove Week 6 from the SPEC\_UNLINK calculation.



\### Critical reconciliation finding



There is an internal numerical inconsistency in the workbook that must be preserved rather than silently corrected.



The workbook's Summary/Answer Key states:



\- Clean SPEC\_UNLINK total: \*\*490\*\*

\- Clean SPEC\_TOTAL: \*\*2,416\*\*

\- Primary clean SPEC\_UNLINK rate: \*\*20.3%\*\*

\- Baseline Weeks 1–8: approximately \*\*10.3%\*\*

\- Elevated Weeks 9–14: approximately \*\*29.0%\*\*



However, independently summing the visible Weekly Queue rows using the documented exclusions and deduplicating Week 9 gives:



\- Clean SPEC\_UNLINK: \*\*447\*\*

\- Clean SPEC\_TOTAL: \*\*2,519\*\*

\- Calculated rate: \*\*447 / 2,519 = 17.75%\*\*



The corresponding visible-row calculations are:



| Period | SPEC\_UNLINK | SPEC\_TOTAL | Calculated rate |

|---|---:|---:|---:|

| Baseline Weeks 1–7 | 130 | 1,380 | 9.42% |

| Elevated clean Weeks 9, 10, 11, 12, 14 | 317 | 1,139 | 27.83% |

| Clean total | 447 | 2,519 | 17.75% |



These figures do not reconcile to the workbook's stated 20.3% answer-key figure.



\*\*QE conclusion:\*\* The 20.3% figure must not be presented as independently derived from the visible weekly rows without identifying the source of the additional/missing component figures.



The workbook's 20.3% figure is therefore recorded as the \*\*provided Answer Key/Summary figure\*\*, not as a newly manufactured calculation.



This discrepancy is itself a data-lineage and reconciliation finding that should be resolved before the 20.3% figure is treated as an independently validated KPI.



\---



\## 6. Baseline versus elevated period



The operational queue shows a clear directional change between the earlier and later weeks.



The workbook Answer Key describes:



\- Baseline Weeks 1–8: approximately \*\*10.3% SPEC\_UNLINK\*\*

\- Elevated Weeks 9–14: approximately \*\*29.0% SPEC\_UNLINK\*\*



The visible weekly rows independently show the same broad pattern even though the exact totals do not reconcile with the Answer Key:



\- Weeks 1–7: \*\*9.42%\*\*

\- Clean elevated Weeks 9, 10, 11, 12 and 14: \*\*27.83%\*\*



Therefore, the important quality-engineering conclusion is robust: \*\*SPEC\_UNLINK rises substantially in the elevated period.\*\*



Week 12 is the visible peak at:



`68 / 235 = 28.9%`



\---



\## 7. The wrong-direction trap: TAT is not the root cause



The operational queue shows TAT increasing above the 72-hour target during the elevated period.



\- Weeks 1–8 TAT is approximately 64 hours on average.

\- Weeks 9–14 TAT is approximately 89 hours on average.



TAT therefore looks like an obvious operational problem.



However, the SPEC\_UNLINK rate rises at the same time.



The Phase 4 investigation therefore treats TAT as a \*\*surface symptom/impact metric\*\*, not the primary root cause.



The more useful causal direction is:



\*\*SPEC\_UNLINK increases → specimen linkage/workflow processing is disrupted → work stalls and turnaround time increases.\*\*



This avoids the wrong-direction conclusion that high TAT itself is the underlying data-quality cause.



\---



\## 8. Independent support-ticket evidence



The support-ticket data contains specimen-linkage reports that support the operational queue pattern.



Examples include:



\- `HLX-1033` – Week 3 – Specimen Linkage

\- `HLX-1036` – Week 3 – Specimen Linkage

\- `HLX-1083` – Week 7 – Specimen Linkage

\- `HLX-1087` – Week 7 – Specimen Linkage

\- `HLX-1111` – Week 9 – Specimen Linkage

\- `HLX-1137` – Week 12 – Specimen Linkage

\- `HLX-1139` – Week 12 – Specimen Linkage



The associated notes include:



> Specimen not associated with service request on creation



The ticket categories also appear with case variations such as `Specimen Linkage`, `SPECIMEN LINKAGE`, and `Specimen linkage`.



This provides an independent qualitative source supporting the interpretation that specimen-to-ServiceRequest linkage is a genuine workflow problem rather than an artefact of TAT alone.



\---



\## 9. Business impact



Without SQL-based data-quality validation, the release review could rely on anecdotal complaints or the visible TAT metric while missing the underlying linkage problem.



The investigation demonstrates that:



1\. The operational queue contains multiple data-quality defects.

2\. The SPEC\_UNLINK signal becomes materially elevated in the later period.

3\. Support-ticket evidence independently describes specimen linkage failures.

4\. TAT rises during the same period but should not automatically be interpreted as the root cause.

5\. The workbook's own summary KPI has a reconciliation problem that should be resolved before it is treated as independently validated.



The primary business implication is that \*\*data quality and metric lineage must be validated before operational KPIs are used to support release decisions.\*\*



\---



\## 10. Synthetic test-data policy requirement



Phase 4 requires synthetic data to remain controlled and distinguishable from production information.



The key policy requirements applied to this work are:



\- Use synthetic healthcare data only.

\- Use a consistent naming/tagging convention for test records and test runs.

\- Keep test data separated from production environments.

\- Do not introduce real patient-identifiable information into the test environment.

\- Apply defined retention and cleanup rules to generated test records.

\- Ensure generated identifiers are unique within the test run.

\- Make test records traceable to the test run that created them.



The Synthea dataset used for the patient import is synthetic and was used for database validation rather than real-patient data.



\---



\## 11. Recommendations



\### Immediate



1\. Reconcile the workbook's Answer Key totals (`490 / 2,416`) against the visible Weekly Queue source rows.

2\. Identify the source of the additional/missing SPEC\_TOTAL and SPEC\_UNLINK components before treating 20.3% as independently validated.

3\. Resolve Week 8's missing SPEC\_TOTAL and QA verification status.

4\. Resolve Week 13's TBC pipeline status.

5\. Investigate the Week 11 duplicate-patient outlier.

6\. Normalise Week 6 TAT before numeric TAT aggregation.

7\. Populate derived percentage fields from validated source counts rather than relying on incomplete stored percentages.



\### Further Phase 4 validation



When the Phase 3 FHIR resources are available in the Phase 4 database, execute the documented orphan ServiceRequest, specimen-patient, and foreign-key validation queries and capture the actual row-count results.



\---



\## 12. Evidence summary



| Evidence | Result |

|---|---|

| Neon database | `neondb` |

| PostgreSQL version | 18.6 |

| Schema | `helix` |

| Synthea patient records imported | 108 |

| Unique patient IDs | 108 |

| Duplicate patient IDs | 0 |

| Missing patient names | 0 |

| Missing birth dates | 0 |

| Future birth dates | 0 |

| SQL validation suite | `database/validation/phase4\_validation.sql` |

| Data-quality issues identified | 8 |

| Workbook Answer Key clean SPEC\_UNLINK rate | 20.3% |

| Independently calculated visible-row clean rate | 17.75% |

| Baseline visible-row rate | 9.42% |

| Elevated visible-row rate | 27.83% |

| FHIR projection checks | Documented, not executed |



\---



\## 13. Conclusion



Phase 4 demonstrates the required quality-engineering approach of \*\*Build – Execute – Investigate – Improve – Submit Evidence\*\*.



The database and synthetic patient dataset were established and validated. The operational queue was reviewed for data-quality defects, the eight documented issues were identified, and the SPEC\_UNLINK pattern was investigated against the misleading TAT signal.



The strongest finding is that the later-period increase in SPEC\_UNLINK is consistent with the observed rise in TAT and with independent support-ticket evidence describing specimen-linkage failures.



A critical reconciliation issue remains in the supplied workbook: its Answer Key reports \*\*20.3%\*\*, while the visible weekly data, when cleaned according to the stated rules, produces \*\*17.75%\*\*. This discrepancy should be explicitly retained as a data-quality/data-lineage finding rather than concealed or resolved by unsupported assumptions.



That approach keeps the Phase 4 evidence reproducible, auditable, and defensible.

