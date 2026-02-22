;; Symbolic diagnosis rules (simplified MYCIN-style).
;; Three symptoms: fever, cough, rash. Three conditions: influenza, measles, allergy.

(defrule diagnose-influenza
  (symptom fever) (symptom cough) (not (symptom rash))
  => (assert (diagnosis influenza 0.85)))

(defrule diagnose-measles
  (symptom fever) (symptom rash)
  => (assert (diagnosis measles 0.90)))

(defrule diagnose-allergy
  (symptom rash) (not (symptom fever))
  => (assert (diagnosis allergy 0.75)))
