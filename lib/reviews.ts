/**
 * Patient reviews, as published on the practice's Google Business Profile and
 * captured on 16 September 2026. Every quote is verbatim — spelling, line breaks
 * and signatures included — because these are patients' own words, not copy.
 *
 * The wall shows the five-star reviews with something to say. RATING_TOTAL and
 * RATING_SUM cover all 48 reviews, the critical ones included, so the headline
 * average stays honest about the whole profile rather than the excerpt.
 */

export type Review = {
  /** The reviewer's Google display name, as they wrote it. */
  name: string
  /** Their Google contributor line, e.g. 'Local Guide·16 reviews·8 photos'. */
  meta: string
  /** Google's own relative date, as it read on the day of capture. */
  date: string
  rating: number
  body: string
}

/** Every review on the profile, not just the ones quoted below. */
export const RATING_TOTAL = 48
const RATING_SUM = 228

/** To one decimal place, the way Google states it. */
export const RATING_AVERAGE = (RATING_SUM / RATING_TOTAL).toFixed(1)

export const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=Mission+Primary+Care+Fremont+reviews'

export const reviews: Review[] = [
  { name: 'AC Sto', meta: '7 reviews', date: '4 years ago', rating: 5, body: 'Dr. Bhandari❤\n\nMy husband and I have been patients of of Dr. Bhandari at MPC for 20 years.\nOur children,  our hospice bound family members ALL have been fortunate enough to have this fine group of doctors to care for them.\n\nAlthough we have moved out of the Bay Area.\nFor the last 7 years. ANY TIME we have had an emergency we\'ve gladly traveled 6 plus hours one way just to be treated by this wonderful man.\n\nGoing back recently to be treated again.\nIt\'s always like a visit with a family member who really truly cares.\n\nAlthough we have medical insurance in our county.\nIt doesn\'t cover this doctors area. We are more than happy to give cash at any time just to get a professional recommendation by them.\nThey\'re just THAT GOOD.\n\nWe HIGHLY RECOMMEND this group of splendid Gentlemen.\nDr. Pareek❤\nDr. Chan❤\nAnd of course our Dr. Bhandari❤❤ we appreciate you all so so much!\nThank you!' },
  { name: 'Anne', meta: 'Local Guide·16 reviews·8 photos', date: '3 years ago', rating: 5, body: 'Dr.Bhandari and his staff at Mission Primary Care are very professional, helpful and kind. I needed urgent assistance with a procedure, and they made it happen. They jumped through hoops with the insurance company and got me scheduled right away. I missed an appointment due to a scheduling conflict with my primary care,  and they were very understanding and kind.\nIn today\'s world of red tape and insurance nightmares,  I thought there was no hope of getting the procedure done quickly, but they were so helpful and patient with all my questions.\n\nI first saw Dr Bhandari in the hospital.  He came in and answered all of my questions, and assured me that his office would help me with all the follow-up that I needed.\n\nI appreciate all the staff at Mission Primary Care.' },
  { name: 'Deen Maqdoor', meta: '1 review', date: '6 years ago', rating: 5, body: 'I have the utmost respect for Dr. Bhupinder  Bahndari.  Excellent medical (and other) advices. The front office runs just as competently as he does, by Dana, Shokria, and Carla.  The place is organized and friendly.\n\nStaff is very responsive to emails for appointments, Rx refills and general medical questions.  I am also impressed by other providers/services they\'ve referred me to.\n\nBelal Maqdoor' },
  { name: 'tiryaD nylsaE', meta: '1 review', date: '5 years ago', rating: 5, body: 'This clinic gets a 15 out of 10 in my book, very comfortable vibe, the lady at the front desk made the experience feel like I was family and not another number attached to a file.\n\nAs well as the doctor, very professional and genuine sense of care.' },
  { name: 'Ramiro Canal', meta: 'Local Guide·14 reviews·1 photo', date: '5 years ago', rating: 5, body: 'Doctors, nurses, front desk staff, everyone in Mission primary Care are polite and take a really good care of you,  everyone knows their jobs, no complaints from me at all :) actually, I would rate, giving them a great job, thumps  up.' },
  { name: 'Tarun Khanna', meta: '4 reviews', date: '5 years ago', rating: 5, body: 'Dr. Bhandari is an extremely knowledgeable doctor. He has immense patience while dealing with his patients. He is encouraging and very supportive. The staff too is quite efficient. We are glad to have him as our physician.' },
  { name: 'Nilu Gupta', meta: '2 reviews', date: '4 years ago', rating: 5, body: 'We are getting excellent services from our primary care Doctor. Dr. Bhupendar Bhandari and his staff of Mission Primary Care serving their patients with great care and devotion.\nProf..Nilu Gupta.' },
  { name: 'G Pink', meta: '2 reviews', date: '3 years ago', rating: 5, body: 'Doc B is and insightful and caring Dr.\nThe staff here are always helpful, kind and communicative and the systems they have in place make it a pleasure to be a part of.' },
  { name: 'C Garcia*', meta: '7 reviews', date: '4 years ago', rating: 5, body: 'The staff was polite and helpful.. the office is in a good location.. Dr is patient and understanding the service was great I will definitely recommend him 👍🏽👌' },
  { name: 'Antonio Sanchez', meta: '1 review', date: '6 years ago', rating: 5, body: 'My experience with dr Bhandari has been very\nInformative\nHelp full in regards to my situation\nThank you  for your care\nAntonio' },
  { name: 'Estella be', meta: 'Local Guide·60 reviews·30 photos', date: '6 years ago', rating: 5, body: 'Great Clinic my Dr Bhandari listens to my issues and cares about each of his patients.  Have been going there for 5yrs.' },
  { name: 'Dominador Bumanlag', meta: '2 reviews·1 photo', date: '3 years ago', rating: 5, body: 'Doctors are very accommodating as well as the staff. They address all questions regarding to my health problems.' },
  { name: 'Chris Puryear', meta: '5 reviews', date: '3 years ago', rating: 5, body: 'The telemedical video call was hiģhly efficient and accomplished what we needed to arrange.  Very thankful.' },
  { name: 'Poliana Lima', meta: '2 reviews', date: 'Edited 3 years ago', rating: 5, body: 'I really enjoyed the service!  Dedicated and super polite people treated me very well, I highly recommend.' },
  { name: 'Adriana Rivera', meta: '4 reviews', date: '3 years ago', rating: 5, body: 'Dr. Bhandari, was very caring and responsive when it came to my concerns. Great staff as well.' },
  { name: 'claudia munoz', meta: '4 reviews', date: '6 years ago', rating: 5, body: 'Thanks for the help everyone at your clinic is very helpful, and I felt very welcome..' },
  { name: 'Cherri Logan', meta: '10 reviews', date: '3 years ago', rating: 5, body: 'Dr. Khan has been my Dr for many years. The best physician I\'ve ever had!' },
  { name: 'NaToya Lee', meta: '5 reviews·1 photo', date: '6 years ago', rating: 5, body: 'Great service. Really professional and I was out in 20 minutes today....' },
  { name: 'Nirmal Mudhar', meta: '1 review', date: '5 years ago', rating: 5, body: 'Had a good experience in the office.  Staff is very friendly.' },
]
