const fs = require('fs');
let content = fs.readFileSync('src/components/RequestQuoteModal.tsx', 'utf-8');

// 1. Add isCatering
content = content.replace(
  /const isMakeup = category === 'makeup';/,
  "const isMakeup = category === 'makeup';\n  const isCatering = category === 'catering';"
);

// 2. Fix the Modal Title
content = content.replace(
  /isMakeup \? 'Bridal Makeup Quote Request' : 'Photography Quote Request'/,
  "isMakeup ? 'Bridal Makeup Quote Request' : isCatering ? 'Catering Quote Request' : 'Photography Quote Request'"
);

// 3. Fix the Subtitle
content = content.replace(
  /Share your \{isCars \? 'rental' : isDecor \? 'decor' : isMakeup \? 'makeup' : 'photography'\} details to receive an exact quotation/,
  "Share your {isCars ? 'rental' : isDecor ? 'decor' : isMakeup ? 'makeup' : isCatering ? 'catering' : 'photography'} details to receive an exact quotation"
);

// 4. Fix Section 1 Header
content = content.replace(
  /1\. \{isCars \? 'CARS & TRANSPORT' : isDecor \? 'DECOR SERVICES' : isMakeup \? 'MAKEUP SERVICES' : 'PHOTOGRAPHY SERVICES'\} NEEDED/,
  "1. {isCars ? 'CARS & TRANSPORT' : isDecor ? 'DECOR SERVICES' : isMakeup ? 'MAKEUP SERVICES' : isCatering ? 'CATERING SERVICES' : 'PHOTOGRAPHY SERVICES'} NEEDED"
);

// 5. Fix Section 3 Header
content = content.replace(
  /3\. ESTIMATED \{isCars \? 'RENTAL' : isDecor \? 'DECOR' : isMakeup \? 'MAKEUP' : 'PHOTOGRAPHY'\} BUDGET/,
  "3. ESTIMATED {isCars ? 'RENTAL' : isDecor ? 'DECOR' : isMakeup ? 'MAKEUP' : isCatering ? 'CATERING' : 'PHOTOGRAPHY'} BUDGET"
);

// 6. Fix Submit Button Text
content = content.replace(
  /isMakeup\r?\n\s*\? 'Send Makeup Quote Request'\r?\n\s*: 'Send Photography Quote Request'/,
  "isMakeup ? 'Send Makeup Quote Request' : isCatering ? 'Send Catering Quote Request' : 'Send Photography Quote Request'"
);

// 7. Fix Success Message
content = content.replace(
  /isMakeup \? 'Makeup Quote Request Sent!' : 'Quote Request Sent!'/,
  "isMakeup ? 'Makeup Quote Request Sent!' : isCatering ? 'Catering Quote Request Sent!' : 'Quote Request Sent!'"
);

// 8. Add Guest Count and Diet Preference for Catering (Between Section 2 and 3)
const cateringFields = `
                  {/* CATERING SPECIFIC FIELDS */}
                  {isCatering && (
                    <>
                      <View style={styles.fieldGroup}>
                        <Text style={styles.fieldLabel}>
                          Estimated Guest Count <Text style={styles.asterisk}>*</Text>
                        </Text>
                        <View style={styles.inputBox}>
                          <TextInput
                            style={styles.textInputFlex}
                            value={notes.match(/GUESTS: ([0-9]+)/)?.[1] || ''}
                            onChangeText={(val) => {
                              const existing = notes.replace(/GUESTS: [0-9]+\\n/, '');
                              setNotes(\`GUESTS: \${val}\\n\${existing}\`);
                            }}
                            placeholder="e.g. 500"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                          />
                        </View>
                      </View>

                      <View style={styles.fieldGroup}>
                        <Text style={styles.fieldLabel}>
                          Dietary Preference <Text style={styles.asterisk}>*</Text>
                        </Text>
                        <View style={styles.chipsRow}>
                          {['Pure Veg', 'Non-Veg', 'Both (Mixed)'].map((diet) => {
                            const isSelected = notes.includes(\`DIET: \${diet}\`);
                            return (
                              <TouchableOpacity
                                key={diet}
                                style={[styles.chip, isSelected && styles.chipSelected]}
                                onPress={() => {
                                  const existing = notes.replace(/DIET: [^\\n]+\\n/, '');
                                  setNotes(\`DIET: \${diet}\\n\${existing}\`);
                                }}
                              >
                                <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                                  {diet}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>
                    </>
                  )}
`;

content = content.replace(
  /(<Text style=\{styles\.fieldLabel\}>\s*3\. ESTIMATED)/,
  cateringFields + '\n                  $1'
);

fs.writeFileSync('src/components/RequestQuoteModal.tsx', content);
console.log('Fixed Catering fields');
