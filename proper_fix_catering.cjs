const fs = require('fs');
let content = fs.readFileSync('src/components/RequestQuoteModal.tsx', 'utf-8');

// Ensure isCatering is defined
if (!content.includes('const isCatering')) {
  content = content.replace(
    /const isMakeup = category === 'makeup';/,
    "const isMakeup = category === 'makeup';\n  const isCatering = category === 'catering';"
  );
}

// Line 328
content = content.replace(
  /{isCars \? 'Car Rental Quote Request' : isEntertainment \? 'Entertainment Quote Request' : isDecor \? 'Wedding Decor Quote Request' : isMakeup \? 'Bridal Makeup Quote Request' : 'Photography Quote Request'}/,
  "{isCars ? 'Car Rental Quote Request' : isEntertainment ? 'Entertainment Quote Request' : isDecor ? 'Wedding Decor Quote Request' : isMakeup ? 'Bridal Makeup Quote Request' : isCatering ? 'Catering Quote Request' : 'Photography Quote Request'}"
);

// Line 332
content = content.replace(
  /Share your \{isCars \? 'transportation' : isEntertainment \? 'entertainment' : isDecor \? 'wedding decor' : isMakeup \? 'bridal makeup' : 'photography'\} details to receive an exact quotation/,
  "Share your {isCars ? 'transportation' : isEntertainment ? 'entertainment' : isDecor ? 'wedding decor' : isMakeup ? 'bridal makeup' : isCatering ? 'catering' : 'photography'} details to receive an exact quotation"
);

// Line 339
content = content.replace(
  /1\. \{isCars \? 'Vehicle\/Services Needed' : isEntertainment \? 'Entertainment Services Needed' : isDecor \? 'Decor Services Needed' : isMakeup \? 'Makeup Services Needed' : 'Photography Services Needed'\}/,
  "1. {isCars ? 'Vehicle/Services Needed' : isEntertainment ? 'Entertainment Services Needed' : isDecor ? 'Decor Services Needed' : isMakeup ? 'Makeup Services Needed' : isCatering ? 'Catering Services Needed' : 'Photography Services Needed'}"
);

// Line 392
content = content.replace(
  /3\. \{isCars \? 'Estimated Rental Budget' : isEntertainment \? 'Estimated Entertainment Budget' : isDecor \? 'Estimated Decor Budget' : isMakeup \? 'Estimated Makeup Budget' : 'Estimated Photography Budget'\}/,
  "3. {isCars ? 'Estimated Rental Budget' : isEntertainment ? 'Estimated Entertainment Budget' : isDecor ? 'Estimated Decor Budget' : isMakeup ? 'Estimated Makeup Budget' : isCatering ? 'Estimated Catering Budget' : 'Estimated Photography Budget'}"
);

// Success Title
content = content.replace(
  /isMakeup \? 'Makeup Quote Request Sent!' : 'Quote Request Sent!'/,
  "isMakeup ? 'Makeup Quote Request Sent!' : isCatering ? 'Catering Quote Request Sent!' : 'Quote Request Sent!'"
);

// Placeholders
if (!content.includes('Need South Indian buffet for 500 guests')) {
  content = content.replace(
    /: isMakeup\s*\?\s*'e\.g\. Need 9-yard saree draping, airbrush makeup for bride \+ 2 family members'\s*: isCars/,
    `: isMakeup
                            ? 'e.g. Need 9-yard saree draping, airbrush makeup for bride + 2 family members'
                            : isCatering
                            ? 'e.g. Need South Indian buffet for 500 guests with live dosa counters'
                            : isCars`
  );
}

// Submit Button
if (!content.includes('Send Catering Quote Request')) {
  content = content.replace(
    /: isMakeup\s*\?\s*'Send Makeup Quote Request'\s*: 'Send Photography Quote Request'/,
    `: isMakeup
                        ? 'Send Makeup Quote Request'
                        : isCatering
                        ? 'Send Catering Quote Request'
                        : 'Send Photography Quote Request'`
  );
}

// Add Guest Count and Diet Preference right before Section 3
const newSectionStr = `
                  {/* CATERING SPECIFIC FIELDS */}
                  {isCatering && (
                    <View style={styles.rowTwoCols}>
                      <View style={[styles.fieldGroup, { flex: 1, marginRight: 6 }]}>
                        <Text style={styles.fieldLabel}>
                          Guest Count <Text style={styles.asterisk}>*</Text>
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

                      <View style={[styles.fieldGroup, { flex: 1, marginLeft: 6 }]}>
                        <Text style={styles.fieldLabel}>
                          Dietary Preference <Text style={styles.asterisk}>*</Text>
                        </Text>
                        <View style={styles.inputBox}>
                          <TextInput
                            style={styles.textInputFlex}
                            value={notes.match(/DIET: ([a-zA-Z -]+)/)?.[1] || ''}
                            onChangeText={(val) => {
                              const existing = notes.replace(/DIET: [a-zA-Z -]+\\n/, '');
                              setNotes(\`DIET: \${val}\\n\${existing}\`);
                            }}
                            placeholder="Veg / Non-Veg / Both"
                            placeholderTextColor="#9CA3AF"
                          />
                        </View>
                      </View>
                    </View>
                  )}
                  
                  {/* SECTION 3`;

if (!content.includes('CATERING SPECIFIC FIELDS')) {
  content = content.replace(
    /\{\/\* SECTION 3/,
    newSectionStr
  );
}

fs.writeFileSync('src/components/RequestQuoteModal.tsx', content);
console.log('Fully fixed RequestQuoteModal');
