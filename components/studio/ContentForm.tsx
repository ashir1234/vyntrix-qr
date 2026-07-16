"use client";

import { useQrStore } from "@/lib/store";
import { Field, Segmented, TextArea, TextInput, Toggle } from "@/components/ui/controls";

export function ContentForm() {
  const type = useQrStore((s) => s.type);
  const f = useQrStore((s) => s.fields);
  const setField = useQrStore((s) => s.setField);

  switch (type) {
    case "url":
      return (
        <Field label="Website URL" hint="https://…">
          <TextInput
            value={f.url}
            inputMode="url"
            placeholder="https://example.com"
            onChange={(e) => setField("url", e.target.value)}
          />
        </Field>
      );

    case "text":
      return (
        <Field label="Text content">
          <TextArea
            value={f.text}
            placeholder="Anything you want to encode…"
            onChange={(e) => setField("text", e.target.value)}
          />
        </Field>
      );

    case "wifi":
      return (
        <div className="space-y-3">
          <Field label="Network name (SSID)">
            <TextInput
              value={f.wifiSsid}
              onChange={(e) => setField("wifiSsid", e.target.value)}
            />
          </Field>
          <Field label="Security">
            <Segmented
              ariaLabel="WiFi security"
              value={f.wifiEncryption}
              onChange={(v) => setField("wifiEncryption", v)}
              options={[
                { value: "WPA", label: "WPA/WPA2" },
                { value: "WEP", label: "WEP" },
                { value: "nopass", label: "None" },
              ]}
            />
          </Field>
          {f.wifiEncryption !== "nopass" && (
            <Field label="Password">
              <TextInput
                value={f.wifiPassword}
                onChange={(e) => setField("wifiPassword", e.target.value)}
              />
            </Field>
          )}
          <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2">
            <span className="text-sm text-[var(--muted)]">Hidden network</span>
            <Toggle
              label="Hidden network"
              checked={f.wifiHidden}
              onChange={(v) => setField("wifiHidden", v)}
            />
          </div>
        </div>
      );

    case "vcard":
      return (
        <div className="grid grid-cols-2 gap-3">
          <Field label="First name">
            <TextInput
              value={f.vcFirstName}
              onChange={(e) => setField("vcFirstName", e.target.value)}
            />
          </Field>
          <Field label="Last name">
            <TextInput
              value={f.vcLastName}
              onChange={(e) => setField("vcLastName", e.target.value)}
            />
          </Field>
          <Field label="Organization">
            <TextInput
              value={f.vcOrg}
              onChange={(e) => setField("vcOrg", e.target.value)}
            />
          </Field>
          <Field label="Title">
            <TextInput
              value={f.vcTitle}
              onChange={(e) => setField("vcTitle", e.target.value)}
            />
          </Field>
          <Field label="Phone">
            <TextInput
              value={f.vcPhone}
              onChange={(e) => setField("vcPhone", e.target.value)}
            />
          </Field>
          <Field label="Email">
            <TextInput
              value={f.vcEmail}
              onChange={(e) => setField("vcEmail", e.target.value)}
            />
          </Field>
          <div className="col-span-2">
            <Field label="Website">
              <TextInput
                value={f.vcUrl}
                onChange={(e) => setField("vcUrl", e.target.value)}
              />
            </Field>
          </div>
        </div>
      );

    case "email":
      return (
        <div className="space-y-3">
          <Field label="To">
            <TextInput
              value={f.emailTo}
              inputMode="email"
              onChange={(e) => setField("emailTo", e.target.value)}
            />
          </Field>
          <Field label="Subject">
            <TextInput
              value={f.emailSubject}
              onChange={(e) => setField("emailSubject", e.target.value)}
            />
          </Field>
          <Field label="Body">
            <TextArea
              value={f.emailBody}
              onChange={(e) => setField("emailBody", e.target.value)}
            />
          </Field>
        </div>
      );

    case "sms":
      return (
        <div className="space-y-3">
          <Field label="Phone number">
            <TextInput
              value={f.smsTo}
              inputMode="tel"
              onChange={(e) => setField("smsTo", e.target.value)}
            />
          </Field>
          <Field label="Message">
            <TextArea
              value={f.smsBody}
              onChange={(e) => setField("smsBody", e.target.value)}
            />
          </Field>
        </div>
      );

    case "phone":
      return (
        <Field label="Phone number">
          <TextInput
            value={f.phoneNumber}
            inputMode="tel"
            placeholder="+1 555 010 0100"
            onChange={(e) => setField("phoneNumber", e.target.value)}
          />
        </Field>
      );

    case "image":
      return (
        <Field
          label="Image URL"
          hint="Must be a public https:// link"
        >
          <TextInput
            value={f.imageUrl}
            inputMode="url"
            placeholder="https://example.com/photo.jpg"
            onChange={(e) => setField("imageUrl", e.target.value)}
          />
        </Field>
      );

    case "location":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Latitude">
              <TextInput
                value={f.locLat}
                inputMode="decimal"
                placeholder="40.7128"
                onChange={(e) => setField("locLat", e.target.value)}
              />
            </Field>
            <Field label="Longitude">
              <TextInput
                value={f.locLng}
                inputMode="decimal"
                placeholder="-74.0060"
                onChange={(e) => setField("locLng", e.target.value)}
              />
            </Field>
          </div>
          <Field label="Place name" hint="Optional">
            <TextInput
              value={f.locLabel}
              placeholder="Office · Cafe · Venue"
              onChange={(e) => setField("locLabel", e.target.value)}
            />
          </Field>
        </div>
      );

    default:
      return null;
  }
}
