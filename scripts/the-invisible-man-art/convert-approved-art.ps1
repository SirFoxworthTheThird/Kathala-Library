param([int]$Quality=84)
Add-Type -AssemblyName System.Drawing
$root=Resolve-Path (Join-Path $PSScriptRoot '..\..')
$manifest=Get-Content (Join-Path $PSScriptRoot 'manifest.json') -Raw | ConvertFrom-Json
if(@($manifest.jobs).Count -ne 1){throw 'Expected one cover job'}
$target=Join-Path $root $manifest.jobs[0].url
$master=[IO.Path]::ChangeExtension($target,'.png')
if(!(Test-Path -LiteralPath $master)){throw "Missing approved master: $master"}
$codec=[Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$parameters=[Drawing.Imaging.EncoderParameters]::new(1)
$parameters.Param[0]=[Drawing.Imaging.EncoderParameter]::new([Drawing.Imaging.Encoder]::Quality,[long]$Quality)
$image=[Drawing.Image]::FromFile($master)
try{$image.Save($target,$codec,$parameters)}finally{$image.Dispose()}
$check=[Drawing.Image]::FromFile($target)
$check.Dispose();$parameters.Dispose()
Write-Output $target
