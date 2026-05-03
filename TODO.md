# TODO: Fix HbA1c Prediction Display

## Tasks
- [x] Modify api.py to return glucose-based HbA1c estimate as prediction
- [x] Update PredictionResult.tsx to display "Estimated Current HbA1c" instead of "3-Month Average"
- [x] Test the prediction display on the webpage

## Notes
- The model predicts HbA1c_3mo but inputs include current HbA1c estimate, making prediction circular
- Correct prediction should be the direct estimate from glucose level
- Formula used: HbA1c (%) = (glucose + 46.7) / 28.7
