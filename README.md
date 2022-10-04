# quickie-washie-v2

TODO:
- [x] Update Profile
- [x] See user profile in appointment detail (admin)
- [x] Update Appointment status
- [x] Update Appointment date
- [x] Sort Appointments by status (customer and admin)
- [x] Analytics
- [x] Send Notifications
- [x] Splash image and app icon
- [x] Send Reviews
- [ ] Report Bugs
- [x] Splash image and app icon
- [ ] Price of appointment (including additional charges)
- [ ] Server time offset on Notifications

REVISIONS: additional charges

SIR SERGE
- [ ] add the name of the client in the application.
- [ ] if client is 24h open, selection of date is irrelevant. otherwise, make sure the time after midnight is disabled (or can't be selected)
- [ ] notifications must be pushed, even if the app is closed (?)
- [ ] if a service is finished, it should be put in a some sort of history of booking

SIR YONG
- [ ] limiting the number of bookings per day should be considered.
- [ ] dapat ma-alam si client na kung ilang beses na nag-book yung isang user.
- [ ] what if the user didn't show up? and if ever the user set the specific time

SIR STAN
- [ ] clarify what has been added from the iteration from softdes.
- [ ] proof of testing is needed.
- [ ] cpedes1 should be improved further from the softdes one.

SIR LUIGI
- [ ] admin and user side should be separated. (NO)
- [ ] transaction trail -- meaning whoever books the first, will be the ones to come, also checks whoever often cancels appointments.
- [x] what kind of email verification? which has an expiration time, consider.

## Prerequisites

1. [docker](https://www.docker.com)
2. [direnv](https://direnv.net/#getting-started)
3. [eas-cli](https://github.com/expo/eas-cli)

## Setup

1. Install Dependencies
```bash
yarn install
```

2. Setup `.env` files
```bash
cp apps/server/.env.example apps/server/.env
cp packages/db/.env.example packages/db/.env
```

3. Setup `.envrc` for mobile app
```bash
cp .envrc.example .envrc # replace contents with your ipv4 address 
direnv allow .
```

## Usage

1. Start postgres in docker & sync with prisma
```bash
docker compose up -d && \
yarn workspace @qw/db run prisma db push
```

2. Start server
```bash
yarn dev
```

3. Start mobile app
> Separated command so you can still interact with expo cli commands and scan QR
```bash
yarn workspace mobile start # then scan with Expo Go application
```

## Building

1. Server
```bash
yarn build
```

2. Mobile (android)
```bash
eas build --platform android --profile preview
```
