param(
    [Parameter(Mandatory=$true)][string]$ObjectId,
    [Parameter(Mandatory=$true)][string]$Source
)
$ErrorActionPreference = 'Stop'
$repo = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$planPath = Join-Path $PSScriptRoot 'unique-art-plan.json'
$plan = Get-Content -LiteralPath $planPath -Raw | ConvertFrom-Json
$slot = $plan.slots | Where-Object objectId -eq $ObjectId | Select-Object -First 1
if (-not $slot -or $slot.status -ne 'pending') { throw "No pending slot: $ObjectId" }
if (-not (Test-Path -LiteralPath $Source -PathType Leaf)) { throw "Missing generated image: $Source" }
$destination = Join-Path $repo ($slot.path.Replace('/', '\'))
New-Item -ItemType Directory -Force -Path (Split-Path $destination) | Out-Null
Add-Type -AssemblyName System.Drawing
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$options = [System.Drawing.Imaging.EncoderParameters]::new(1)
$options.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]90)
$image = [System.Drawing.Image]::FromFile($Source)
try { $image.Save($destination, $encoder, $options) }
finally { $image.Dispose(); $options.Dispose() }
node (Join-Path $PSScriptRoot 'mark-unique-art.mjs') $ObjectId (Split-Path $Source -Leaf)
Write-Output "Accepted $ObjectId -> $($slot.path)"
