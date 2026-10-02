param([int]$Quality=84)
Add-Type -AssemblyName System.Drawing
$repo=Resolve-Path (Join-Path $PSScriptRoot '..\..')
$manifest=Get-Content (Join-Path $PSScriptRoot 'manifest.json') -Raw | ConvertFrom-Json
$codec=[Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$parameters=[Drawing.Imaging.EncoderParameters]::new(1)
$parameters.Param[0]=[Drawing.Imaging.EncoderParameter]::new([Drawing.Imaging.Encoder]::Quality,[long]$Quality)
if(@($manifest.jobs).Count -ne 129){throw "Expected 129 approved jobs, got $(@($manifest.jobs).Count)"}
foreach($job in $manifest.jobs){
  $target=Join-Path $repo $job.url
  $master=[IO.Path]::ChangeExtension($target,'.png')
  if(!(Test-Path -LiteralPath $master)){throw "Missing approved master: $master"}
  $image=[Drawing.Image]::FromFile($master)
  try{$image.Save($target,$codec,$parameters)}finally{$image.Dispose()}
  $check=[Drawing.Image]::FromFile($target)
  $check.Dispose()
}
$parameters.Dispose()
Write-Output "Converted $(@($manifest.jobs).Count) approved masters to JPEG."
