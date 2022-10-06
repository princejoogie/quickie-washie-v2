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
- [x] Price of appointment (including additional charges)
- [x] Server time offset on Notifications

REVISIONS: additional charges

- [ ] Max 5 booking per service per day
- [ ] Operating hrs: 9am-11am 3pm-8pm
- [x] Add the name of the client in the application.
- [x] What kind of email verification? which has an expiration time, consider.
- [ ] Field schemas
- [x] PENDING: notifications must be pushed, even if the app is closed (?)
- [x] PENDING: admin and user side should be separated. (NO)

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
